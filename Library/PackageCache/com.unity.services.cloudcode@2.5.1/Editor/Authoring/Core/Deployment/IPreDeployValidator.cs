using System.Collections.Generic;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    interface IPreDeployValidator
    {
        Task<ValidationInfo> Validate(IReadOnlyList<IScript> scripts);
    }
}
