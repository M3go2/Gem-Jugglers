using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    interface INodeJsRunner
    {
        Task<bool> IsNodeJsAvailable();

        Task<string> ExecNodeJs(
            IEnumerable<string> arguments = default,
            string stdIn = default,
            CancellationToken cancellationToken = default);
    }
}
