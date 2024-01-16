using Unity.Services.DeploymentApi.Editor;
using IEnvironmentProvider = Unity.Services.CloudCode.Authoring.Editor.Core.Deployment.IEnvironmentProvider;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment
{
    class EnvironmentProvider : IEnvironmentProvider
    {
        public string Current => Deployments.Instance.EnvironmentProvider.Current;
    }
}
