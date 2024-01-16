using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Bundling
{
    interface IScriptBundler
    {
        Task<bool> ShouldBeBundled(string filePath, CancellationToken cancellationToken);
        Task<ScriptBundle> Bundle(string filePath, CancellationToken cancellationToken);
    }
}
