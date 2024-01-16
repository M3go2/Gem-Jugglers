using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Unity.Services.CloudCode.Authoring.Editor.Projects;
using Unity.Services.CloudCode.Authoring.Editor.Projects.Settings;
using UnityEditor;
using UnityEditor.Callbacks;
using UnityEngine;
using IExternalCodeEditor = Unity.Services.CloudCode.Authoring.Editor.Projects.IExternalCodeEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts
{
    class JsAssetHandler
    {
        const string k_SolutionPath = "$(SolutionPath)";
        const string k_EditorExePath = "$(EditorExePath)";

        readonly Func<ICloudCodeProjectSettings> m_ProjectSettings;
        readonly IProcessRunner m_ProcessRunner;
        readonly IExternalCodeEditor m_CodeEditor;

        public static readonly Dictionary<string, string> SupportedArguments = new Dictionary<string, string>
        {
            { "$(File)", "File Path" },
            { "$(ProjectPath)", "Project Directory" },
            { k_SolutionPath, "Solution Path" },
            { k_EditorExePath, "Editor Executable Path" }
        };

        public JsAssetHandler(
            Func<ICloudCodeProjectSettings> projectSettings,
            IProcessRunner processRunner,
            IExternalCodeEditor codeEditor)
        {
            m_ProjectSettings = projectSettings;
            m_ProcessRunner = processRunner;
            m_CodeEditor = codeEditor;
        }

        [OnOpenAsset]
        static bool OpenAsset(int instanceID, int line)
        {
            var obj = EditorUtility.InstanceIDToObject(instanceID);
            var filePath = AssetDatabase.GetAssetPath(obj);
            if (CloudCodeFileExtensions.SupportedExtensions(Application.unityVersion)
                .Any(extension => filePath.EndsWith(extension)))
            {
                var assetHandler = CloudCodeAuthoringServices.Instance.GetService<JsAssetHandler>();
                assetHandler.OpenFile(filePath);
                return true;
            }

            return false;
        }

        public void OpenFile(string filePath)
        {
            OpenFile(
                filePath,
                m_ProjectSettings()?.ExternalEditorPath,
                m_ProjectSettings()?.ExternalEditorArgsFormat);
        }

        internal void OpenFile(
            string filePath,
            string applicationPath,
            string argumentFormat)
        {
            var path = Path.Combine(
                Application.dataPath,
                filePath.Replace("Assets/", ""));
            var quotedPath = m_CodeEditor.QuoteForProcessStart(path);

            if (OpenCustomFormat(applicationPath, path, argumentFormat))
                return;

            if (!string.IsNullOrEmpty(applicationPath)
                && m_CodeEditor.OSOpenFile(applicationPath, quotedPath))
                return;

            if (m_CodeEditor.OpenProject(path))
                return;

            m_CodeEditor.OSOpenFile(CodeEditor.CodeEditor.CurrentEditorInstallation, quotedPath);
        }

        bool OpenCustomFormat(string applicationPath, string filePath, string argumentFormat)
        {
            if (string.IsNullOrEmpty(applicationPath)
                || string.IsNullOrEmpty(argumentFormat))
            {
                return false;
            }

            var args = ParseArguments(argumentFormat, filePath);
            var processStartInfo = new ProcessStartInfo
            {
                FileName = applicationPath,
                Arguments = args
            };

            return m_ProcessRunner.Start(processStartInfo);
        }

        internal string ParseArguments(string argsFormat, string filePath)
        {
            var args = CodeEditor.CodeEditor.ParseArgument(
                argsFormat,
                filePath,
                -1,
                -1);

            var slnPath = Path.Combine(
                Directory.GetParent(Application.dataPath).FullName,
                Application.productName + ".sln");

            slnPath = m_CodeEditor.QuoteForProcessStart(slnPath);

            var editorExecutablePath = m_CodeEditor.CurrentEditorInstallation;
            editorExecutablePath = m_CodeEditor.QuoteForProcessStart(editorExecutablePath);

            args = args.Replace(k_SolutionPath, slnPath);
            args = args.Replace(k_EditorExePath, editorExecutablePath);
            return args;
        }
    }
}
