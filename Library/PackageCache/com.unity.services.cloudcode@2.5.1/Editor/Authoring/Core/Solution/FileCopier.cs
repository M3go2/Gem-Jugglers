using System;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Solution
{
    class FileCopier : IFileCopier
    {
        ITemplateInfo m_TemplateInfo;
        IPathResolver m_PathResolver;
        IFileSystem m_FileSystem;
        IFileContentRetriever m_FileContentRetriever;

        public FileCopier(
            ITemplateInfo templateInfo,
            IPathResolver pathResolver,
            IFileSystem fileSystem,
            IFileContentRetriever fileContentRetriever)
        {
            m_TemplateInfo = templateInfo;
            m_PathResolver = pathResolver;
            m_FileSystem = fileSystem;
            m_FileContentRetriever = fileContentRetriever;
        }

        public async Task CopySolution(string dstDirectory, string moduleName, CancellationToken cancellationToken)
        {
            await CopyFile(
                m_TemplateInfo.PathSolution,
                m_PathResolver.GetSolutionPath(dstDirectory, moduleName),
                cancellationToken);
        }

        internal async Task CopyFile(string srcPath, string dstPath, CancellationToken cancellationToken)
        {
            var directoryPath = m_FileSystem.GetDirectoryName(dstPath);
            if (!string.IsNullOrEmpty(directoryPath) && !m_FileSystem.DirectoryExists(directoryPath))
            {
                await m_FileSystem.CreateDirectory(directoryPath);
            }

            if (!m_FileSystem.FileExists(dstPath))
            {
                var newFileStream = m_FileSystem.CreateFile(dstPath);
                newFileStream.Close();
            }

            var fileContent = await m_FileContentRetriever.GetFileContent(srcPath, cancellationToken);
            await m_FileSystem.WriteAllText(dstPath, fileContent, cancellationToken);
        }

        public async Task CopyProjectWithExample(string dstDirectory, string moduleName, CancellationToken cancellationToken)
        {
            await CopyFile(
                m_TemplateInfo.PathProject,
                m_PathResolver.GetProjectPath(dstDirectory, moduleName),
                cancellationToken);
            await CopyFile(
                m_TemplateInfo.PathExampleClass,
                m_PathResolver.GetExampleClassPath(dstDirectory, moduleName),
                cancellationToken);
        }

        public async Task CopyPublishConfigs(string dstDirectory, string moduleName, CancellationToken cancellationToken)
        {
            await CopyFile(
                m_TemplateInfo.PathConfigUser,
                m_PathResolver.GetPubxmlPath(dstDirectory, moduleName, true),
                cancellationToken);
            await CopyFile(
                m_TemplateInfo.PathConfig,
                m_PathResolver.GetPubxmlPath(dstDirectory, moduleName, false),
                cancellationToken);
        }
    }
}
