using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Bundling;
using Unity.Services.CloudCode.Authoring.Editor.Projects;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.DeploymentApi.Editor;
using UnityEngine;
using Logger = Unity.Services.CloudCode.Authoring.Editor.Shared.Logging.Logger;
using ThreadSync = Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.Threading.Sync;

namespace Unity.Services.CloudCode.Authoring.Editor.Bundling
{
    class BundleDependencyChangeTracker : IDisposable
    {
        internal int BackgroundSleepMs = 1000;
        internal Task DependencyWorkerTask;

        readonly string k_DataPath = Application.dataPath;

        readonly ConcurrentDictionary<Script, IReadOnlyCollection<string>> m_DependencyTree = new();
        readonly ConcurrentQueue<Script> m_DirtyItems = new();

        readonly IScriptModifiedTracker m_ScriptModifiedTracker;
        readonly IScriptBundler m_ScriptBundler;
        readonly ObservableCollection<IDeploymentItem> m_Scripts;
        readonly INodeJsRunner m_NodeJsRunner;

        public BundleDependencyChangeTracker(IScriptModifiedTracker scriptModifiedTracker, IScriptBundler scriptBundler, ObservableCollection<IDeploymentItem> scripts, INodeJsRunner nodeJsRunner)
        {
            m_ScriptBundler = scriptBundler;
            m_Scripts = scripts;
            m_ScriptModifiedTracker = scriptModifiedTracker;
            m_NodeJsRunner = nodeJsRunner;

            m_ScriptModifiedTracker.ScriptModified += OnScriptModified;
            m_ScriptModifiedTracker.EmitExisting();
        }

        public void Dispose()
        {
            m_ScriptModifiedTracker.ScriptModified -= OnScriptModified;
        }

        void OnScriptModified(object sender, Script script)
        {
            if (m_Scripts.Contains(script))
            {
                m_DirtyItems.Enqueue(script);
            }
            else
            {
                m_DependencyTree.TryRemove(script, out _);
            }

            if (DependencyWorkerTask == null || DependencyWorkerTask.IsCompleted)
            {
                DependencyWorkerTask = ComputeDependencies();
            }
        }

        async Task ComputeDependencies()
        {
            // Cancel the operation if node isn't present
            if (!await m_NodeJsRunner.IsNodeJsAvailable())
            {
                return;
            }

            await ThreadSync.RunInBackgroundThread<object>(async() =>
            {
                await Task.Delay(BackgroundSleepMs);
                try
                {
                    var seenScripts = new HashSet<Script>();
                    while (m_DirtyItems.TryDequeue(out var toUpdate))
                    {
                        if (seenScripts.Contains(toUpdate))
                        {
                            continue;
                        }

                        await UpdateScriptDependencies(toUpdate);
                        seenScripts.Add(toUpdate);
                    }
                }
                catch (Exception e)
                {
                    Logger.LogException(e);
                }
                return null;
            });
            UpdateDirtyStates();
        }

        async Task UpdateScriptDependencies(Script toUpdate)
        {
            if (await m_ScriptBundler.ShouldBeBundled(toUpdate.Path, CancellationToken.None))
            {
                var bundle = await m_ScriptBundler.Bundle(toUpdate.Path, CancellationToken.None);
                var assetRelativeDependencyPaths = bundle
                    .Dependencies
                    .Select(p => p.Replace('\\', '/'))
                    .Where(p => p.StartsWith(k_DataPath))
                    .Select(p => "Assets" + p.Substring(k_DataPath.Length))
                    .ToList();
                SetScriptDependencies(toUpdate, assetRelativeDependencyPaths);
            }
            else
            {
                SetScriptDependencies(toUpdate, new List<string>());
            }
        }

        void SetScriptDependencies(Script script, List<string> dependencies)
        {
            m_DependencyTree.AddOrUpdate(script, dependencies, (_, _) => dependencies);
        }

        void UpdateDirtyStates()
        {
            foreach (var(item, dependencies) in m_DependencyTree.ToList())
            {
                if (item.Status.Equals(DeploymentStatus.ModifiedLocally)
                    || dependencies.Count == 0)
                {
                    continue;
                }

                foreach (var dependency in dependencies)
                {
                    var status = m_Scripts.FirstOrDefault(i => i.Path == dependency)?.Status;
                    if (status.HasValue && status.Value.Equals(DeploymentStatus.ModifiedLocally))
                    {
                        item.Status = DeploymentStatus.ModifiedLocally;
                        break;
                    }
                }
            }
        }
    }
}
