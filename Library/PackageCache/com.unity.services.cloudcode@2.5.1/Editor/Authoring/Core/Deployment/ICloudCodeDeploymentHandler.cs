using System.Collections.Generic;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    interface ICloudCodeDeploymentHandler
    {
        Task<DeployResult> DeployAsync(IEnumerable<IScript> scripts, bool reconcile = false, bool dryRun = false);
    }
}
