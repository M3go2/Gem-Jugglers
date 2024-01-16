using System.IO;
using UnityEditor.AssetImporters;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Modules
{
    [ScriptedImporter(1, CloudCodeModuleReferenceResources.FileExtension)]
    class CloudCodeModuleReferenceImporter : ScriptedImporter
    {
        public void OnValidate()
        {
            hideFlags = HideFlags.HideInInspector;
        }

        public override void OnImportAsset(AssetImportContext ctx)
        {
            var fileContent = File.ReadAllText(ctx.assetPath);
            var definition = ScriptableObject.CreateInstance<CloudCodeModuleReference>();

            definition.FromJson(fileContent);

            ctx.AddObjectToAsset("MainAsset", definition, CloudCodeModuleReferenceResources.Icon);
            ctx.SetMainObject(definition);
        }
    }
}
