using System.IO;
using Unity.Services.CloudCode.Authoring.Editor.Analytics;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.IO;
using UnityEditor;
using UnityEditor.ProjectWindowCallback;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Modules.UI
{
    class CreateCloudCodeModuleReference : EndNameEditAction
    {
        const string k_DefaultReferenceName = "new_module_reference";
        static readonly string k_MonoDefinitionPath =
            Path.Combine(CloudCodePackage.EditorPath, "Authoring/Modules/CloudCodeModuleReference.cs");

        [MenuItem("Assets/Create/Cloud Code C# Module Reference", false, 81)]
        public static void CreateModuleReferenceFile()
        {
            var filePath = k_DefaultReferenceName + CloudCodeModuleReferenceResources.FileExtension;
            var icon = CloudCodeModuleReferenceResources.Icon;

            ProjectWindowUtil.StartNameEditingIfProjectWindowExists(
                0,
                CreateInstance<CreateCloudCodeModuleReference>(),
                filePath,
                icon,
                null);
        }

        [InitializeOnLoadMethod]
        static void SetMonoDefinitionIcon()
        {
            var monoImporter = (MonoImporter)AssetImporter.GetAtPath(k_MonoDefinitionPath);
            var monoScript = monoImporter.GetScript();
            EditorGUIUtility.SetIconForObject(monoScript,  CloudCodeModuleReferenceResources.Icon);
        }

        public override void Action(int instanceId, string pathName, string resourceFile)
        {
            var reference = CreateInstance<CloudCodeModuleReference>();
            reference.Name =  Path.GetFileName(pathName);
            reference.ModulePath =
                Path.Combine(
                    PathUtils.GetRelativePath(pathName, Application.dataPath),
                    Path.GetFileNameWithoutExtension(reference.Name));
            File.WriteAllText(pathName, reference.ToJson());

            CloudCodeAuthoringServices.Instance.GetService<CloudModuleCreationAnalytics>().SendReferenceCreatedEvent();

            AssetDatabase.Refresh();
        }
    }
}
