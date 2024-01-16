using System.Collections.ObjectModel;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using UnityEditor;
using UnityEngine;
using Unity.Services.DeploymentApi.Editor;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment
{
    class CloudCodeDeploymentProvider : DeploymentProvider
    {
        public override string Service => L10n.Tr("Cloud Code");

        public override Command DeployCommand { get; }
        public override Command OpenCommand { get; }

        public CloudCodeDeploymentProvider(DeployCommand deployCommand,
                                           OpenCommand openCommand,
                                           ObservableCollection<IDeploymentItem> scripts) : base(scripts)
        {
            DeployCommand = deployCommand;
            OpenCommand = openCommand;
        }

        public void ValidateDeploymentStatus()
        {
            foreach (var deploymentItem in DeploymentItems)
            {
                var item = (Script)deploymentItem;
                if (!IsStateValid(item))
                {
                    item.Progress = 0f;
                    item.Status = new DeploymentStatus();
                }
            }
        }

        static bool IsStateValid(Script script)
        {
            return Mathf.Approximately(script.Progress, 100f)
                || script.Status.MessageSeverity == SeverityLevel.Error
                || script.Status.MessageSeverity == SeverityLevel.Warning;
        }
    }
}
