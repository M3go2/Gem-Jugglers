using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Dotnet
{
    interface IDotnetRunner
    {
        Task<bool> IsDotnetAvailable();
        Task<string> ExecuteDotnetAsync(
            IEnumerable<string> arguments = default,
            CancellationToken cancellationToken = default);
    }
}
