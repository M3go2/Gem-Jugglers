using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Dotnet;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    class SolutionPublisher : ISolutionPublisher
    {
        readonly IDotnetRunner m_DotnetRunner;
        readonly IFileSystem m_FileSystem;

        public SolutionPublisher(IDotnetRunner dotnetRunner, IFileSystem fileSystem)
        {
            m_DotnetRunner = dotnetRunner;
            m_FileSystem = fileSystem;
        }

        public async Task<string> PublishToFolder(string solutionPath, string outputPath, CancellationToken cancellationToken)
        {
            var csprojName = ValidateSolutionFolder(solutionPath);
            await m_DotnetRunner.ExecuteDotnetAsync(
                new[] { $"publish \"{solutionPath}\" -c Release -r linux-x64 -o \"{outputPath}\"" }, cancellationToken);
            return csprojName;
        }

        string ValidateSolutionFolder(string solutionPath)
        {
            var pubXmlPath = GetPublishProfilePath(solutionPath);

            var csProjFilePath = GetCsProjFilePath(pubXmlPath, solutionPath);

            return m_FileSystem.GetFileNameWithoutExtension(csProjFilePath);
        }

        string GetCsProjFilePath(string pubXmlPath, string solutionPath)
        {
            var xml = m_FileSystem.GetDirectoryName(pubXmlPath)!;
            string[] csprojFiles = m_FileSystem.DirectoryGetFiles(xml, "*.csproj");

            while (m_FileSystem.DirectoryGetParent(xml) != null && csprojFiles.Length == 0 && xml != solutionPath)
            {
                xml = m_FileSystem.DirectoryGetParent(xml)!.ToString();
                csprojFiles = m_FileSystem.DirectoryGetFiles(xml, "*.csproj");
            }

            if (csprojFiles.Length != 1)
                throw new Exception("Could not find the Project associated with the publishing profile. " +
                    "Please make sure your .pubxml file is under the Project hierarchy.");

            return csprojFiles[0];
        }

        string GetPublishProfilePath(string solutionPath)
        {
            var pubXmls = m_FileSystem.DirectoryGetFiles(
                m_FileSystem.GetDirectoryName(solutionPath)!, "*.pubxml", SearchOption.AllDirectories);

            if (pubXmls.Length != 1)
            {
                if (pubXmls.Length > 1)
                {
                    throw new Exception("Too many Publish Profiles. Please update your solution to only have 1 .pubxml.");
                }
                throw new Exception("Could not find a Publish Profile.");
            }

            return pubXmls[0];
        }
    }
}
