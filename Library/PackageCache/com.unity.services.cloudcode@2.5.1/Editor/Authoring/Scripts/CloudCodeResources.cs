using UnityEditor;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts
{
    static class CloudCodeResources
    {
        const string k_TexturePath = "Js Script Icon";

        public static readonly Texture2D Icon = (Texture2D)EditorGUIUtility.IconContent(k_TexturePath).image;
    }
}
