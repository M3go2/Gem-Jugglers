using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment.DeploymentTask
{
    class DeployTask
    {
        public IScript Script { get; set; }
        public Task<IScript> Task { get; set; }
    }
}
