using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    interface INpmScriptRunner
    {
        bool CanRunScript(string script);
        Task<string> RunScript(
            string script,
            IEnumerable<string> arguments = default,
            string stdIn = default,
            CancellationToken cancellationToken = default);
    }
}
