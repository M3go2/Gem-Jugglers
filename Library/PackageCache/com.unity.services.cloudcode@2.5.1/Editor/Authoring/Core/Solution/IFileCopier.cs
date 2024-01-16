using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Solution
{
    interface IFileCopier
    {
        Task CopySolution(string dstDirectory, string moduleName, CancellationToken cancellationToken);
        Task CopyProjectWithExample(string dstDirectory, string moduleName, CancellationToken cancellationToken);
        Task CopyPublishConfigs(string dstDirectory, string moduleName, CancellationToken cancellationToken);
    }
}
