using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Newtonsoft.Json;
using Unity.Services.CloudCode.Authoring.Client.Http;
using Unity.Services.CloudCode.Authoring.Editor.Core.Bundling;
using Unity.Services.CloudCode.Authoring.Editor.Projects;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Analytics;
using Unity.Services.CloudCode.Authoring.Editor.Shared.EditorUtils;
using ILogger = Unity.Services.CloudCode.Authoring.Editor.Core.Logging.ILogger;

namespace Unity.Services.CloudCode.Authoring.Editor.Bundling
{
    class EditorScriptBundler : IScriptBundler
    {
        readonly INodeJsRunner m_ScriptRunner;
        readonly ILogger m_Logger;
        readonly ICommonAnalytics m_CommonAnalytics;

        public EditorScriptBundler(INodeJsRunner scriptRunner, ICommonAnalytics commonAnalytics, ILogger logger)
        {
            m_ScriptRunner = scriptRunner;
            m_CommonAnalytics = commonAnalytics;
            m_Logger = logger;
        }

        public async Task<bool> ShouldBeBundled(string filePath, CancellationToken cancellationToken)
        {
            var fullScriptPath = Path.GetFullPath(ScriptPaths.ScriptShouldBundle);
            var output = await m_ScriptRunner.ExecNodeJs(
                new[] { fullScriptPath, filePath },
                null,
                cancellationToken);
            output = output.Trim();

            bool.TryParse(output, out var shouldBundle);
            return shouldBundle;
        }

        public async Task<ScriptBundle> Bundle(string filePath, CancellationToken cancellationToken)
        {
            var bundlerPath = Path.GetFullPath("Packages/com.unity.services.cloudcode/Editor/Authoring/Core/Bundling/Assets~/shim.cjs");
            var scriptPath = Path.GetFullPath(filePath);
            try
            {
                var bundleJson = await m_ScriptRunner.ExecNodeJs(
                    new List<string> { bundlerPath, scriptPath },
                    cancellationToken: cancellationToken);
                var bundle = ParseJsonBundle(bundleJson);
                SendBundlingEvent(null);
                return bundle;
            }
            catch (Exception e)
            {
                SendBundlingEvent(e);
                m_Logger.LogError(e.Message);
                throw;
            }
        }

        void SendBundlingEvent([CanBeNull] Exception exception)
        {
            Sync.RunNextUpdateOnMain(() =>
            {
                const string bundlingAction = "bundling";
                var result = m_CommonAnalytics.Send(new ICommonAnalytics.CommonEventPayload
                {
                    action = bundlingAction,
                    context = nameof(EditorScriptBundler),
                    exception = exception?.GetType().FullName
                });
                m_Logger.LogVerbose($"Sent Analytics Event: {bundlingAction}. Result: {result}");
            });
        }

        static ScriptBundle ParseJsonBundle(string bundleJson)
        {
            return IsolatedJsonConvert.DeserializeObject<ScriptBundle>(bundleJson, new JsonSerializerSettings());
        }
    }
}
