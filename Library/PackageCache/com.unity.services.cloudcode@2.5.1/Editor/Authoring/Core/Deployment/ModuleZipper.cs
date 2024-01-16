using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    class ModuleZipper : IModuleZipper
    {
        const string PublishPathEnd = "module-compilation";
        const string ZipFileExtension = "ccm";

        readonly IFileSystem m_FileSystem;

        public ModuleZipper(IFileSystem fileSystem)
        {
            m_FileSystem = fileSystem;
        }

        public async Task<string> ZipCompilation(string solutionFilePath, string moduleName, CancellationToken cancellationToken)
        {
            var directoryPath = m_FileSystem.GetDirectoryName(solutionFilePath);
            if (directoryPath == null)
            {
                throw new DirectoryNotFoundException();
            }

            var publishedFilesPath = m_FileSystem.Join(directoryPath, PublishPathEnd);
            var zipPath = m_FileSystem.ChangeExtension(moduleName, ZipFileExtension);

            var destinationArchiveFileName = m_FileSystem.Join(directoryPath, zipPath);
            if (m_FileSystem.FileExists(destinationArchiveFileName))
            {
                await m_FileSystem.Delete(destinationArchiveFileName, cancellationToken);
            }

            m_FileSystem.CreateZipFromDirectory(publishedFilesPath, destinationArchiveFileName);
            return destinationArchiveFileName;
        }
    }
}
