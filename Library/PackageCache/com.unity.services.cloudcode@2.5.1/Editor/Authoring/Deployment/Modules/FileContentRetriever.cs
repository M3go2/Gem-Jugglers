using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;
using Unity.Services.CloudCode.Authoring.Editor.Core.Solution;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment.Modules
{
    class FileContentRetriever : IFileContentRetriever
    {
        IFileSystem m_FileSystem;

        public FileContentRetriever(IFileSystem fileSystem)
        {
            m_FileSystem = fileSystem;
        }

        public Task<string> GetFileContent(string path, CancellationToken token = default)
        {
            File.ReadAllText(path);
            return m_FileSystem.ReadAllText(path, token);
        }
    }
}
