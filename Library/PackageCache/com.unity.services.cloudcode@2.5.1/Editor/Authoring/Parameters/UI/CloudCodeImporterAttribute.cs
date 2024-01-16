using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using UnityEditor.AssetImporters;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Parameters.UI
{
    class CloudCodeImporterAttribute : ScriptedImporterAttribute
    {
        public CloudCodeImporterAttribute()
            : base(1, CloudCodeFileExtensions.SupportedExtensions(Application.unityVersion))
        {
        }
    }
}
