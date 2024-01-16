using Unity.Services.CloudCode.Authoring.Editor.AdminApi;
using Unity.Services.CloudCode.Authoring.Editor.Core.Analytics;
using Unity.Services.CloudCode.Authoring.Editor.Core.Deployment;
using Unity.Services.CloudCode.Authoring.Editor.Core.Logging;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.DeploymentApi.Editor;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment
{
    class EditorCloudCodeDeploymentHandler : CloudCodeDeploymentHandler
    {
        public EditorCloudCodeDeploymentHandler(
            ICloudCodeScriptsClient client,
            IDeploymentAnalytics deploymentAnalytics,
            ILogger logger,
            IPreDeployValidator validator) :
            base(client, deploymentAnalytics, logger, validator)
        {
        }

        protected override void UpdateScriptProgress(IScript script, float progress)
        {
            ((Script)script).Progress = progress;
        }

        protected override void UpdateScriptStatus(IScript script,
            string message,
            string detail,
            StatusSeverityLevel level = StatusSeverityLevel.None)
        {
            ((Script)script).Status = new DeploymentStatus(
                message,
                detail,
                ToDeploymentSeverityLevel(level));
        }

        protected override void UpdateValidationStatus(
            ValidationInfo validationInfo)
        {
            foreach (var(invalidScript, exception) in validationInfo.InvalidScripts)
            {
                UpdateScriptStatus(
                    invalidScript,
                    DeploymentStatuses.DeployFailed,
                    exception.Message,
                    StatusSeverityLevel.Error);
            }
        }

        internal static SeverityLevel ToDeploymentSeverityLevel(StatusSeverityLevel level)
        {
            switch (level)
            {
                case StatusSeverityLevel.None:
                    return SeverityLevel.None;
                case StatusSeverityLevel.Info:
                    return SeverityLevel.Info;
                case StatusSeverityLevel.Success:
                    return SeverityLevel.Success;
                case StatusSeverityLevel.Warning:
                    return SeverityLevel.Warning;
                case StatusSeverityLevel.Error:
                default:
                    return SeverityLevel.Error;
            }
        }
    }
}
