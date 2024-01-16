using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.IO
{
    interface IFileReader
    {
        Task<string> ReadAllTextAsync(string filePath, CancellationToken cancellationToken);
        Task<Stream> Open(string filePath, FileMode fileMode, FileAccess fileAccess);
    }
}
