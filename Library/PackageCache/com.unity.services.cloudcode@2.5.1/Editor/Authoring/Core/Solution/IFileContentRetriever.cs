using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Solution
{
    interface IFileContentRetriever
    {
        Task<string> GetFileContent(string path, CancellationToken token = default);
    }
}
