using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects.Settings
{
    class CloudCodeProjectSettings : ICloudCodeProjectSettings
    {
        const string k_NodeJsKey = "NodeJsPath";
        const string k_NpmKey = "NpmPath";
        const string k_ExternalEditorPath = "ExternalEditorPath";
        const string k_ExternalEditorArgsFormat = "ExternalEditorArgsFormat";
        const string k_DotnetPath = "DotnetPath";

        public string ExternalEditorPath { get; set; }
        public string ExternalEditorArgsFormat { get; set; }
        public string DotnetPath { get; set; } =
#if UNITY_EDITOR_WIN
            "dotnet";
#elif UNITY_EDITOR_LINUX
            "/usr/share/dotnet";
#else
            "/usr/local/share/dotnet/dotnet";
#endif

        public string NodeJsPath { get; set; } =
#if UNITY_EDITOR_WIN
            @"C:\Program Files\nodejs\node.exe";
#elif UNITY_EDITOR_LINUX
            "/usr/bin/node";
#else
            "/usr/local/bin/node";
#endif
        public string NpmPath { get; set; } =
#if UNITY_EDITOR_WIN
            @"C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js";
#elif UNITY_EDITOR_LINUX
            "/usr/bin/npm";
#else
            "/usr/local/bin/npm";
#endif

        public void Load()
        {
            NpmPath = EditorPrefs.GetString(k_NpmKey, NpmPath);
            NodeJsPath = EditorPrefs.GetString(k_NodeJsKey, NodeJsPath);
            DotnetPath = EditorPrefs.GetString(k_DotnetPath, DotnetPath);
            ExternalEditorPath = EditorPrefs.GetString(k_ExternalEditorPath, ExternalEditorPath);
            ExternalEditorArgsFormat = EditorPrefs.GetString(k_ExternalEditorArgsFormat, ExternalEditorArgsFormat);
        }

        public void Save()
        {
            EditorPrefs.SetString(k_NpmKey, NpmPath);
            EditorPrefs.SetString(k_NodeJsKey, NodeJsPath);
            EditorPrefs.SetString(k_DotnetPath, DotnetPath);
            EditorPrefs.SetString(k_ExternalEditorPath, ExternalEditorPath);
            EditorPrefs.SetString(k_ExternalEditorArgsFormat, ExternalEditorArgsFormat);
        }
    }
}
