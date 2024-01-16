using System.IO;
using Unity.Services.CloudCode.Authoring.Editor.Core.Solution;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment.Modules
{
    class TemplateInfo: ITemplateInfo
    {
        public string PathSolution => Path.Combine(CloudCodePackage.EditorPath,
            "Authoring/Core/Solution/Template~/Solution.sln");
        public string PathProject => Path.Combine(CloudCodePackage.EditorPath,
            "Authoring/Core/Solution/Template~/Project/Project.csproj");
        public string PathExampleClass => Path.Combine(CloudCodePackage.EditorPath,
            "Authoring/Core/Solution/Template~/Project/Example.cs");
        public string PathConfig => Path.Combine(CloudCodePackage.EditorPath,
                "Authoring/Core/Solution/Template~/Project/Properties/PublishProfiles/FolderProfile.pubxml");
        public string PathConfigUser => Path.Combine(CloudCodePackage.EditorPath,
                "Authoring/Core/Solution/Template~/Project/Properties/PublishProfiles/FolderProfile.pubxml.user");
    }
}
