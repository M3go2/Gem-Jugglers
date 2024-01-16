using System.IO;
using UnityEditor;
using Unity.Services.CloudCode.Authoring.Editor.Analytics;
using UnityEditor.ProjectWindowCallback;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts.UI
{
    class CreateCloudCodeScript : EndNameEditAction
    {
        const string k_TemplatePath = "Authoring/Scripts/Templates/new_cloud_code_script.js.txt";
        static readonly string k_DefaultFileName = "new_cloud_code_script";
        static readonly string k_MonoDefinitionPath = Path.Combine(CloudCodePackage.EditorPath, "Authoring/Scripts/CloudCodeScript.cs");

        [MenuItem("Assets/Create/Cloud Code Js Script", false, 81)]
        public static void CreateScript()
        {
            CreateScriptInternal();
            CloudCodeAuthoringServices.Instance.GetService<CloudScriptCreationAnalytics>().SendCreatedEvent();
        }

        static void CreateScriptInternal()
        {
            var filePath = k_DefaultFileName + CloudCodeFileExtensions.Preferred();
            var icon = CloudCodeResources.Icon;

            ProjectWindowUtil.StartNameEditingIfProjectWindowExists(
                0,
                CreateInstance<CreateCloudCodeScript>(),
                filePath,
                icon,
                null);
        }

        [InitializeOnLoadMethod]
        static void SetMonoDefinitionIcon()
        {
            var monoImporter = (MonoImporter)AssetImporter.GetAtPath(k_MonoDefinitionPath);
            var monoScript = monoImporter.GetScript();
            EditorGUIUtility.SetIconForObject(monoScript,  CloudCodeResources.Icon);
        }

        public override void Action(int instanceId, string pathName, string resourceFile)
        {
            var templatePath = Path.Combine(CloudCodePackage.EditorPath, k_TemplatePath);
            File.WriteAllText(pathName, File.ReadAllText(templatePath));
            AssetDatabase.Refresh();
        }
    }
}
