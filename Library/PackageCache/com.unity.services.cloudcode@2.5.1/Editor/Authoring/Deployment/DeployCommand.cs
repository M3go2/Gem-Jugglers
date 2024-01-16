using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.AdminApi;
using Unity.Services.CloudCode.Authoring.Editor.Core.Analytics;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.Collections;
using Unity.Services.DeploymentApi.Editor;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment
{
    class DeployCommand : Command
    {
        readonly EditorCloudCodeDeploymentHandler m_EditorCloudCodeDeploymentHandler;
        readonly IDeploymentAnalytics m_DeploymentAnalytics;
        readonly IScriptReader m_ScriptReader;

        bool m_reconcile;
        bool m_dryRun;
        public override string Name => L10n.Tr("Deploy");

        public DeployCommand(
            EditorCloudCodeDeploymentHandler editorCloudCodeDeploymentHandler,
            IDeploymentAnalytics deploymentAnalytics,
            IScriptReader scriptReader)
        {
            m_EditorCloudCodeDeploymentHandler = editorCloudCodeDeploymentHandler;
            m_DeploymentAnalytics = deploymentAnalytics;
            m_ScriptReader = scriptReader;

            m_reconcile = false;
            m_dryRun = false;
        }

        public override async Task ExecuteAsync(IEnumerable<IDeploymentItem> items, CancellationToken cancellationToken = default)
        {
            var scripts = await GetScriptsFromDeploymentItems(items);

            OnDeploy(scripts);

            using (m_DeploymentAnalytics.Scope())
            {
                try
                {
                    await m_EditorCloudCodeDeploymentHandler.DeployAsync(scripts, m_reconcile, m_dryRun);
                }
                catch (Exception e)
                {
                    m_DeploymentAnalytics.SendFailureDeploymentEvent(e.GetType().ToString());
                    throw;
                }
                finally
                {
                    scripts.ForEach(script => script.Body = null);
                }
            }
        }

        async Task<List<Script>> GetScriptsFromDeploymentItems(IEnumerable<IDeploymentItem> deploymentItems)
        {
            var scripts = new List<Script>();
            foreach (var deploymentItem in deploymentItems)
            {
                var script = (Script)deploymentItem;
                var readScript = await m_ScriptReader.ReadFromPath(deploymentItem.Path);
                script.Body = readScript.Body;
                script.Parameters = readScript.Parameters;
                scripts.Add(script);
            }

            return scripts;
        }

        static void OnDeploy(IEnumerable<Script> items)
        {
            items.ForEach(i =>
            {
                i.Progress = 0f;
                i.Status = new DeploymentStatus();
                i.States.Clear();
            });
        }
    }
}
