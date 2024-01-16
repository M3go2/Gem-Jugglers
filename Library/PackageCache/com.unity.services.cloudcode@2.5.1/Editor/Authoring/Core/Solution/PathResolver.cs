using Unity.Services.CloudCode.Authoring.Editor.Core.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Solution
{
    class PathResolver : IPathResolver
    {
        internal const string FolderProject = "Project";
        internal const string FolderProperties = "Properties";
        internal const string FolderPublishProfiles = "PublishProfiles";
        internal const string FileProject = "Project.csproj";
        internal const string FileExample = "Example.cs";
        internal const string FilePubxml = "FolderProfile.pubxml";
        internal const string FilePubxmlUser = "FolderProfile.pubxml.user";

        IFileSystem m_FileSystem;

        public PathResolver(IFileSystem fileSystem)
        {
            m_FileSystem = fileSystem;
        }

        public string GetSolutionPath(string dstDirectory, string moduleName)
        {
            return m_FileSystem.Combine(
                dstDirectory,
                moduleName + ".sln");
        }

        public string GetProjectPath(string dstDirectory, string moduleName)
        {
            return m_FileSystem.Combine(
                dstDirectory,
                FolderProject,
                FileProject);
        }

        public string GetExampleClassPath(string dstDirectory, string moduleName)
        {
            return m_FileSystem.Combine(
                dstDirectory,
                FolderProject,
                FileExample);
        }

        public string GetPubxmlPath(string dstDirectory, string moduleName, bool isUserFile)
        {
            return m_FileSystem.Combine(
                dstDirectory,
                FolderProject,
                FolderProperties,
                FolderPublishProfiles,
                isUserFile
                ? FilePubxmlUser
                : FilePubxml);
        }
    }
}
