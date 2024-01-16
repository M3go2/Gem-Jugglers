using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Deployment;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.Modules;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.Collections;
using Unity.Services.DeploymentApi.Editor;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment.Modules
{
    class CloudCodeModuleDeployCommand : Command<CloudCodeModuleReference>
    {
        public override string Name => L10n.Tr("Deploy");

        readonly IFileSystem m_FileSystem;
        readonly IModuleZipper m_ModuleZipper;
        readonly ISolutionPublisher m_SolutionPublisher;

        readonly EditorCloudCodeModuleDeploymentHandler m_EditorCloudCodeDeploymentHandler;
        readonly bool m_Reconcile;
        readonly bool m_DryRun;

        public CloudCodeModuleDeployCommand(
            IFileSystem fileSystem,
            IModuleZipper moduleZipper,
            ISolutionPublisher solutionPublisher,
            EditorCloudCodeModuleDeploymentHandler editorCloudCodeDeploymentHandler)
        {
            m_FileSystem = fileSystem;
            m_ModuleZipper = moduleZipper;
            m_SolutionPublisher = solutionPublisher;

            m_EditorCloudCodeDeploymentHandler = editorCloudCodeDeploymentHandler;
            m_Reconcile = false;
            m_DryRun = false;
        }

        public override async Task ExecuteAsync(IEnumerable<CloudCodeModuleReference> items, CancellationToken cancellationToken = new CancellationToken())
        {
            var cloudCodeModuleReferences = items.ToList();
            OnDeploy(cloudCodeModuleReferences);
            var compiled = await Compile(cloudCodeModuleReferences, cancellationToken);
            m_EditorCloudCodeDeploymentHandler.SetReferenceFiles(cloudCodeModuleReferences.ToList());
            await m_EditorCloudCodeDeploymentHandler.DeployAsync(compiled, m_Reconcile, m_DryRun);
        }

        static void OnDeploy(IEnumerable<CloudCodeModuleReference> items)
        {
            items.ForEach(i =>
            {
                i.Progress = 0f;
                i.Status = new DeploymentStatus();
                i.States.Clear();
            });
        }

        internal async Task<List<IScript>> Compile(IEnumerable<CloudCodeModuleReference> items, CancellationToken cancellationToken = default)
        {
            var generationList = new List<IScript>();
            foreach (var ccmr in items)
            {
                var ccmrDir = m_FileSystem.GetDirectoryName(m_FileSystem.GetFullPath(ccmr.Path));
                var targetPath = m_FileSystem.Combine(ccmrDir, ccmr.ModulePath);
                targetPath = m_FileSystem.GetFullPath(targetPath);

                try
                {
                    var generatedModuleName = await GenerateDLLs(ccmr, targetPath, cancellationToken);
                    ccmr.ModuleName = generatedModuleName;

                    var createdFilePath = await m_ModuleZipper.ZipCompilation(targetPath, generatedModuleName, cancellationToken);
                    UpdateStatus(ccmr, 66f, "Zipped Successfully");

                    var model = GenerateModel(generatedModuleName, createdFilePath);
                    generationList.Add(model);
                }
                catch (Exception e)
                {
                    ccmr.Status = new DeploymentStatus("Failed to compile", e.Message, SeverityLevel.Error);
                }
            }

            return generationList;
        }

        async Task<string> GenerateDLLs(
            CloudCodeModuleReference ccmr, string targetPath, CancellationToken cancellationToken = default)
        {
            var outputPath = m_FileSystem.Combine(m_FileSystem.GetDirectoryName(targetPath), "module-compilation");
            var generatedModuleName = await m_SolutionPublisher.PublishToFolder(targetPath, outputPath, cancellationToken);
            UpdateStatus(ccmr, 33f, "Compiled Successfully");
            return generatedModuleName;
        }

        Script GenerateModel(string moduleName, string filePath)
        {
            var name = new ScriptName(m_FileSystem.GetFileNameWithoutExtension(moduleName));
            return new Script(filePath)
            {
                Name = name,
                Body = string.Empty,
                Parameters = new List<CloudCodeParameter>(),
                Language = Language.CS
            };
        }

        static void UpdateStatus(CloudCodeModuleReference item, float progress, string statusMessage)
        {
            item.Progress = progress;
            item.Status = new DeploymentStatus(statusMessage);
        }
    }
}
