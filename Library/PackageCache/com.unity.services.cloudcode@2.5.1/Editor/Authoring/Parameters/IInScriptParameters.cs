using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Parameters
{
    interface IInScriptParameters
    {
        Task<List<CloudCodeParameter>> GetParametersFromPath(string path, CancellationToken cancellationToken = default);
    }
}
