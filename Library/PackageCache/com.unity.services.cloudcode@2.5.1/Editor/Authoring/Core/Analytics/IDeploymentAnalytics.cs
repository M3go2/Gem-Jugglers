using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Analytics
{
    interface IDeploymentAnalytics
    {
        IDisposable Scope();
        IDisposable BeginDeploySend(int fileSize);
        void SendFailureDeploymentEvent(string exceptionType);
        void SendSuccessfulPublishEvent();
        void SendFailurePublishEvent(string exceptionType);
    }
}
