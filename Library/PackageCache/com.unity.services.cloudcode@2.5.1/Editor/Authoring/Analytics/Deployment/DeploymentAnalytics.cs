using System;
using Unity.Services.CloudCode.Authoring.Editor.Core.Analytics;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Analytics;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Logging;
using Unity.Services.DeploymentApi.Editor;
using UnityEditor;
using UnityEngine.Analytics;

namespace Unity.Services.CloudCode.Authoring.Editor.Analytics.Deployment
{
    class DeploymentAnalytics : IDeploymentAnalytics
    {
        const string k_EventNameDeploy = "cloudcode_filedeployed";
        const string k_EventNamePublish = "cloudcode_filepublished";
        const string k_UserAction = "automatic";
        const int k_VersionDeploy = 1;
        const int k_VersionPublish = 1;

        readonly Lazy<IEnvironmentProvider> m_EnvironmentProvider;

        public DeploymentAnalytics(Lazy<IEnvironmentProvider> environmentProvider)
        {
            AnalyticsUtils.RegisterEventDefault(k_EventNameDeploy, k_VersionDeploy);
            AnalyticsUtils.RegisterEventDefault(k_EventNamePublish, k_VersionPublish);
            m_EnvironmentProvider = environmentProvider;
        }

        public IDisposable Scope()
        {
            return new DisposableScope(() => {});
        }

        public IDisposable BeginDeploySend(int fileSize)
        {
            return new AnalyticsTimer((duration) => SendSuccessfulDeploymentEvent(duration, fileSize));
        }

        void SendSuccessfulDeploymentEvent(float duration, int fileSize)
        {
            var deploymentArguments = new DeploymentParameters()
            {
                origin = k_UserAction,
                environment = m_EnvironmentProvider.Value.Current,
                status = "success",
                exception = null,
                duration = duration,
                size = fileSize,
            };
            SendDeployEvent(deploymentArguments);
        }

        public void SendFailureDeploymentEvent(string exceptionType)
        {
            var deploymentArguments = new DeploymentParameters()
            {
                origin = k_UserAction,
                environment = m_EnvironmentProvider.Value.Current,
                status = "failure",
                exception = exceptionType,
                duration = 0,
                size = 0,
            };
            SendDeployEvent(deploymentArguments);
        }

        public void SendSuccessfulPublishEvent()
        {
            var publishParameters = new PublishParameters()
            {
                origin = k_UserAction,
                environment = m_EnvironmentProvider.Value.Current,
                status = "success",
                exception = null,
            };
            SendPublishEvent(publishParameters);
        }

        public void SendFailurePublishEvent(string exceptionType)
        {
            var publishParameters = new PublishParameters()
            {
                origin = k_UserAction,
                environment = m_EnvironmentProvider.Value.Current,
                status = "failure",
                exception = exceptionType,
            };
            SendPublishEvent(publishParameters);
        }

        static void SendDeployEvent(DeploymentParameters deploymentParameters)
        {
            var res = EditorAnalytics.SendEventWithLimit(k_EventNameDeploy, deploymentParameters, k_VersionDeploy);
            LogVerbose(k_EventNameDeploy, k_VersionDeploy, res);
        }

        static void SendPublishEvent(PublishParameters publishParameters)
        {
            var res = EditorAnalytics.SendEventWithLimit(k_EventNamePublish, publishParameters, k_VersionPublish);
            LogVerbose(k_EventNamePublish, k_VersionPublish, res);
        }

        static void LogVerbose(string eventName, int version, AnalyticsResult result)
        {
            Logger.LogVerbose($"Sent Analytics Event: {eventName}.v{version}. Result: {result}");
        }
    }
}
