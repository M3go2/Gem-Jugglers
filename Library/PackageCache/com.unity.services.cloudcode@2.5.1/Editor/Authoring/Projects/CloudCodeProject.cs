using System.Collections.Generic;
using System.IO;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    class CloudCodeProject
    {
        const string k_CCAVersion = "ccaVersion";

        public static readonly string InternalJsPackage = PackagePath("Packages/com.unity.services.cloudcode/NpmPackage~");

        static readonly string k_UnityServicesNpmLocalPath = $"{CloudCodePackage.RootPath}/UnityServicesNpmLocal~";
        static readonly string InternalEconomyPackage = PackagePath($"{k_UnityServicesNpmLocalPath}/economy");
        static readonly string InternalCloudSavePackage = PackagePath($"{k_UnityServicesNpmLocalPath}/cloud-save");
        static readonly string InternalRemoteConfigPackage = PackagePath($"{k_UnityServicesNpmLocalPath}/remote-config");
        static readonly string InternalVivoxPackage = PackagePath($"{k_UnityServicesNpmLocalPath}/vivox");
        static readonly string InternalLobbyPackage = PackagePath($"{k_UnityServicesNpmLocalPath}/lobby");

        static readonly IDictionary<string, string> k_Dependencies = new Dictionary<string, string>
        {
            { "axios", "^0.21.2" },
            { "axios-0.21", "npm:axios@^0.21.2" },
            { "lodash", "4.17.21" },
            { "lodash-4.17", "npm:lodash@^4.17" },
            { "@unity-services/cloud-save", $"file:{InternalCloudSavePackage}-0.0.5.tgz" },
            { "@unity-services/cloud-save-1.0", $"file:{InternalCloudSavePackage}-1.0.1.tgz" },
            { "@unity-services/economy-2.0", $"file:{InternalEconomyPackage}-2.0.2.tgz" },
            { "@unity-services/economy-2.1", $"file:{InternalEconomyPackage}-2.1.1.tgz" },
            { "@unity-services/remote-config", $"file:{InternalRemoteConfigPackage}-0.0.4.tgz" },
            { "@unity-services/remote-config-1.0", $"file:{InternalRemoteConfigPackage}-1.0.1.tgz" },
            { "@unity-services/remote-config-1.1.0", $"file:{InternalRemoteConfigPackage}-1.1.0.tgz" },
            { "@unity-services/remote-config-1.1.1", $"file:{InternalRemoteConfigPackage}-1.1.1.tgz" },
            { "@unity-services/remote-config-1.1.2", $"file:{InternalRemoteConfigPackage}-1.1.2.tgz" },
            { "@unity-services/vivox-0.1", $"file:{InternalVivoxPackage}-0.1.6.tgz" },
            { "@unity-services/lobby-1.0", $"file:{InternalLobbyPackage}-1.0.1.tgz" },
        };
        static readonly IDictionary<string, string> k_DevDependencies = new Dictionary<string, string>
        {
            {"@types/lodash", "^4.14.177"},
            {"@types/lodash-4.17", "npm:@types/lodash@^4.14.177"}
        };

        public string PackageVersion { get; private set; }

        readonly NodeProject m_NodeProject;

        public CloudCodeProject(NodeProject project)
        {
            m_NodeProject = project;
            PackageVersion = m_NodeProject.GetValue<string>(k_CCAVersion);
        }

        public void AddDependencies()
        {
            m_NodeProject.AddDependencies(k_Dependencies);
            m_NodeProject.AddDevDependencies(k_DevDependencies);
        }

        public void AddPackageVersion(string packageVersion)
        {
            PackageVersion = packageVersion;
            m_NodeProject.SetValue(k_CCAVersion, packageVersion);
        }

        public void Save()
        {
            m_NodeProject.Save();
        }

        public static CloudCodeProject OpenDefault()
        {
            return new CloudCodeProject(new NodeProject(NodeProject.ProjectFile));
        }

        public static bool IsInitialized()
        {
            return File.Exists(NodeProject.ProjectFile);
        }

        static string PackagePath(string unityPath)
        {
            return PathUtils.GetRelativePath(".", Path.GetFullPath(unityPath));
        }
    }
}
