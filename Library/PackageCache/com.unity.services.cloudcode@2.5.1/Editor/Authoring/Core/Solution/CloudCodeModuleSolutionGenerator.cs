using System;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Dotnet;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Solution
{
    class CloudCodeModuleSolutionGenerator
    {
        IFileSystem m_FileSystem;
        IFileCopier m_FileCopier;
        IDotnetRunner m_DotnetRunner;

        public CloudCodeModuleSolutionGenerator(
            IFileSystem fileSystem,
            IFileCopier fileCopier,
            IDotnetRunner dotnetRunner)
        {
            m_FileSystem = fileSystem;
            m_FileCopier = fileCopier;
            m_DotnetRunner = dotnetRunner;
        }

        public async Task CreateSolutionWithProject(string dstDirectory, string moduleName, CancellationToken cancellationToken)
        {
            await CopyFilesFromTemplate(dstDirectory, moduleName, cancellationToken);
            await UpdateProjectName(dstDirectory, moduleName, cancellationToken);
        }

        async Task CopyFilesFromTemplate(string dstDirectory, string moduleName, CancellationToken cancellationToken)
        {
            var slnTask = m_FileCopier.CopySolution(dstDirectory, moduleName, cancellationToken);
            var projectTask = m_FileCopier.CopyProjectWithExample(dstDirectory, moduleName, cancellationToken);
            var configTask = m_FileCopier.CopyPublishConfigs(dstDirectory, moduleName, cancellationToken);

            await Task.WhenAll(slnTask, projectTask, configTask);
        }

        async Task UpdateProjectName(string dstDirectory, string moduleName, CancellationToken cancellationToken)
        {
            var solutionPath = m_FileSystem.Combine(dstDirectory, $"{moduleName}.sln");
            var projectPath = m_FileSystem.Combine(dstDirectory, "Project");

            await m_DotnetRunner.ExecuteDotnetAsync(
                new[] { $"sln \"{solutionPath}\" remove \"{projectPath}\"" }, cancellationToken);

            m_FileSystem.FileMove(m_FileSystem.Combine(projectPath, "Project.csproj"),
                m_FileSystem.Combine(projectPath, $"{moduleName!}.csproj"));

            await m_DotnetRunner.ExecuteDotnetAsync(
                new[] { $"sln \"{solutionPath}\" add \"{projectPath}\"" }, cancellationToken);
        }
    }
}
