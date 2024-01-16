using System.Collections.Generic;
using System.Linq;
using Unity.Services.CloudCode.Authoring.Editor.AdminApi;
using Unity.Services.CloudCode.Authoring.Editor.Core.Analytics;
using Unity.Services.CloudCode.Authoring.Editor.Core.Deployment;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;
using Unity.Services.CloudCode.Authoring.Editor.Core.Logging;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.Modules;
using Unity.Services.DeploymentApi.Editor;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment
{
    class EditorCloudCodeModuleDeploymentHandler : CloudCodeDeploymentHandler
    {
        readonly IFileSystem m_FileSystem;
        List<CloudCodeModuleReference> m_ReferenceFiles;

        public EditorCloudCodeModuleDeploymentHandler(
            ICloudCodeModulesClient client,
            IDeploymentAnalytics deploymentAnalytics,
            ILogger logger,
            IPreDeployValidator validator,
            IFileSystem fileSystem) :
            base(client, deploymentAnalytics, logger, validator)
        {
            m_FileSystem = fileSystem;
            m_ReferenceFiles = new List<CloudCodeModuleReference>();
        }

        public void SetReferenceFiles(List<CloudCodeModuleReference> referenceFiles)
        {
            m_ReferenceFiles = referenceFiles;
        }

        protected override void UpdateScriptProgress(IScript script, float progress)
        {
            foreach (var reference in m_ReferenceFiles.Where(reference => IsSameModule(script, reference)))
            {
                reference.Progress = progress;
            }
        }

        protected override void UpdateScriptStatus(IScript script,
            string message,
            string detail,
            StatusSeverityLevel level = StatusSeverityLevel.None)
        {
            foreach (var reference in m_ReferenceFiles.Where(reference => IsSameModule(script, reference)))
            {
                reference.Status = new DeploymentStatus(
                    message,
                    detail,
                    ToDeploymentSeverityLevel(level));
            }
        }

        bool IsSameModule(IScript script, CloudCodeModuleReference reference)
        {
            return reference.ModuleName == script.Name.ToString();
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

        static SeverityLevel ToDeploymentSeverityLevel(StatusSeverityLevel level)
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
