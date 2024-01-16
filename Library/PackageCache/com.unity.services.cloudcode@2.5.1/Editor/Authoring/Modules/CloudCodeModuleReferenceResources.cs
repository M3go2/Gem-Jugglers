using UnityEditor;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Modules
{
    static class CloudCodeModuleReferenceResources
    {
        public const string SolutionExtension = ".sln";
        public const string FileExtension = ".ccmr";

        const string k_TexturePath = "DefaultAsset Icon";

        public static readonly Texture2D Icon = (Texture2D)EditorGUIUtility.IconContent(k_TexturePath).image;
    }
}
