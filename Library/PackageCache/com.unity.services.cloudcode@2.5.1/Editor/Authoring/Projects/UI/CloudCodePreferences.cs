using System.Linq;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Package;
using UnityEditor;
using UnityEngine;
using Unity.Services.CloudCode.Authoring.Editor.Projects.Settings;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Assets;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.IO;
using Unity.Services.CloudCode.Authoring.Editor.Shared.UI;
using UnityEngine.UIElements;
using Logger = Unity.Services.CloudCode.Authoring.Editor.Shared.Logging.Logger;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects.UI
{
    class CloudCodePreferences : SettingsProvider
    {
        static readonly string k_Revert = L10n.Tr("Revert");
        static readonly string k_Apply = L10n.Tr("Apply");

        static readonly string k_NodeJsPathLabel = L10n.Tr("NodeJS Path");
        static readonly string k_NpmPathLabel = L10n.Tr("NPM Path");
        static readonly string k_ExternalEditorLabel = L10n.Tr("Application Path");
        static readonly string k_ExternalEditorFormatLabel = L10n.Tr("Editor Arguments");
        static readonly string k_JsProjectInfo = L10n.Tr("Configures your Unity project as a NodeJS project."
            + " Setting up your NodeJS project enables tooling such as autocomplete and in-script parameters.");
        static readonly string k_JsEditorInfo = L10n.Tr("Set and configure the script editor used when opening Javascript files.");

        internal static readonly string PackageName = L10n.Tr("com.unity.services.cloudcode");
        internal static readonly string VersionMismatchWarning = L10n.Tr("NPM was initialized by a package version that does not match you installed package version."
            + "You can update your version through 'Preferences > Cloud Code > Initialize JS Project'");
        static readonly string k_InitializeNmpTitle = L10n.Tr("Initialize Npm");
        static readonly string k_InitializingNmpMessage = L10n.Tr("Initializing npm");
        static readonly string k_InstallingPackages = L10n.Tr("Installing packages");
        static readonly string k_JavascriptEnv = L10n.Tr("Javascript development environment");
        static readonly string k_InitButtonText = L10n.Tr("Initialize JS project");
        static readonly string k_JavascriptEditor = L10n.Tr("Javascript editor");
        static readonly string k_ChooseFile = L10n.Tr("Choose File...");
        static readonly string k_ChooseExternalEditor = L10n.Tr("Choose external editor");
        static readonly string k_SupportedLaunchArguments = L10n.Tr("Supported launch arguments:");

        static readonly string k_DotnetPathLabel = L10n.Tr(".NET Path");
        static readonly string k_DotnetEnv = L10n.Tr(".NET development environment");
        static readonly string k_DotnetProjectInfo = L10n.Tr("Setting up your .NET path will enable Cloud Code Module compilation and deployment");

#if UNITY_EDITOR_OSX || UNITY_EDITOR_WIN
        static readonly string k_ExternalEditorDefaultDirectory =
            System.Environment.GetFolderPath(System.Environment.SpecialFolder.ProgramFiles);
#else
        static readonly string k_ExternalEditorDefaultDirectory = string.Empty;
#endif

        protected CloudCodeProjectSettings ProjectSettings;
        CloudCodeProjectSettings CloudCodeProjectSettings
        {
            get
            {
                if (ProjectSettings == null)
                {
                    ProjectSettings = new CloudCodeProjectSettings();
                }
                return ProjectSettings;
            }
        }
        bool m_Dirty;

        protected GUIStyle m_Heading1;
        protected GUIStyle m_Style;

        void OnActivated(string searchContext, VisualElement visualElement)
        {
            CloudCodeProjectSettings.Load();

            m_Heading1 = new GUIStyle(EditorStyles.boldLabel)
            {
                fontSize = 16
            };

            m_Style = new GUIStyle()
            {
                margin = new RectOffset(6, 0, 0, 0)
            };
        }

        internal CloudCodePreferences() : base("Preferences/Cloud Code", SettingsScope.User)
        {
            activateHandler = OnActivated;
        }

        [SettingsProvider]
        public static SettingsProvider CreateSettingsProvider()
        {
            return new CloudCodePreferences();
        }

        public static ICloudCodeProjectSettings LoadProjectSettings()
        {
            var settings = new CloudCodeProjectSettings();
            settings.Load();
            return settings;
        }

        [InitializeOnLoadMethod]
        static async Task OnValidateNodeProject()
        {
            if (!CloudCodeProject.IsInitialized())
            {
                return;
            }

            var packageVersionProvider = CloudCodeAuthoringServices.Instance.GetService<IPackageVersionProvider>();
            var notifications = CloudCodeAuthoringServices.Instance.GetService<INotifications>();
            var npm = CloudCodeAuthoringServices.Instance.GetService<NodePackageManager>();
            await ValidateNodeProject(CloudCodeProject.OpenDefault(), packageVersionProvider, notifications, npm);
        }

        static async Task InitializeNpm(
            INodePackageManager npm,
            IPackageVersionProvider packageVersionProvider,
            INotifications notifications)
        {
            using var progressBar = notifications.ProgressBar(k_InitializeNmpTitle, k_InitializingNmpMessage, 2);

            await npm.Init();

            progressBar.OperationInfo = k_InstallingPackages;
            progressBar.CompleteStep();

            await UpdateNpmProject(CloudCodeProject.OpenDefault(), npm, packageVersionProvider, progressBar);
        }

        internal static async Task UpdateNpmProject(
            CloudCodeProject project,
            INodePackageManager npm,
            IPackageVersionProvider packageVersionProvider,
            IProgressBar progressBar)
        {
            var packageVersion = await packageVersionProvider.GetPackageVersionAsync(PackageName);

            project.AddDependencies();
            project.AddPackageVersion(packageVersion);
            project.Save();

            await npm.Install();
            progressBar.CompleteStep();

            using var assets = new ObservableAssets<CloudCodeScript>();
            foreach (var jsScript in assets)
            {
                AssetDatabase.ImportAsset(PathUtils.GetRelativePath(".", jsScript.Path), ImportAssetOptions.ForceUpdate);
            }
        }

        internal static async Task ValidateNodeProject(CloudCodeProject project,
            IPackageVersionProvider packageVersionProvider,
            INotifications notifications,
            INodePackageManager npm)
        {
            var packageVersion = await packageVersionProvider.GetPackageVersionAsync(PackageName);

            if (packageVersion != project.PackageVersion)
            {
                Logger.LogWarning(VersionMismatchWarning);
            }
        }

        public override void OnGUI(string searchContext)
        {
            base.OnGUI(searchContext);

            EditorGUILayout.BeginVertical(m_Style);
            DrawVerticalSettingsArea();
            EditorGUILayout.EndVertical();
        }

        void DrawVerticalSettingsArea()
        {
            EditorGUILayout.Space();
            DrawJsDevEnvironment();
            GUILayout.Space(24);
            DrawExternalEditor();
            GUILayout.Space(24);
            DrawDotnetDevEnvironment();
            ApplyButtons();
        }

        void DrawJsDevEnvironment()
        {
            EditorGUILayout.LabelField(k_JavascriptEnv, m_Heading1);
            EditorGUILayout.Space();

            var nodeJSPathValue = ProjectSettings.NodeJsPath;
            var npmValue = ProjectSettings.NpmPath;

            nodeJSPathValue = CheckChange(
                EditorGUILayout.TextField(k_NodeJsPathLabel, nodeJSPathValue),
                nodeJSPathValue);
            npmValue = CheckChange(
                EditorGUILayout.TextField(k_NpmPathLabel, npmValue),
                npmValue);

            ProjectSettings.NodeJsPath = nodeJSPathValue;
            ProjectSettings.NpmPath = npmValue;

            EditorGUILayout.Space();

            DrawInitJsProject();

            EditorGUILayout.Space();

            EditorGUILayout.HelpBox(k_JsProjectInfo, MessageType.Info);
        }

        /// <summary>
        /// Async void required for use with OnGUI.
        /// Should remove need for async void with UITK implementation.
        /// </summary>
        static async void DrawInitJsProject()
        {
            if (GUILayout.Button(k_InitButtonText, GUILayout.ExpandWidth(false)))
            {
                var npm = CloudCodeAuthoringServices.Instance.GetService<NodePackageManager>();
                var packageVersionProvider = CloudCodeAuthoringServices.Instance.GetService<IPackageVersionProvider>();
                var notifications = CloudCodeAuthoringServices.Instance.GetService<INotifications>();

                await InitializeNpm(npm, packageVersionProvider, notifications);
            }
        }

        void DrawExternalEditor()
        {
            EditorGUILayout.LabelField(k_JavascriptEditor, m_Heading1);
            EditorGUILayout.Space();
            EditorGUILayout.LabelField(k_JsEditorInfo);
            EditorGUILayout.Space();
            using (new EditorGUILayout.HorizontalScope())
            {
                var externalEditorPathValue = ProjectSettings.ExternalEditorPath;

                externalEditorPathValue = CheckChange(
                    EditorGUILayout.TextField(
                        k_ExternalEditorLabel,
                        externalEditorPathValue,
                        GUILayout.ExpandWidth(true)),
                    externalEditorPathValue);

                if (GUILayout.Button(k_ChooseFile, GUILayout.ExpandWidth(false)))
                {
                    var applicationPath = EditorUtility.OpenFilePanel(
                        k_ChooseExternalEditor,
                        k_ExternalEditorDefaultDirectory,
                        string.Empty);

                    if (!string.IsNullOrEmpty(applicationPath))
                        externalEditorPathValue = CheckChange(applicationPath, externalEditorPathValue);
                }

                ProjectSettings.ExternalEditorPath = externalEditorPathValue;
            }

            using (new EditorGUILayout.HorizontalScope())
            {
                var externalEditorArgsFormatValue = ProjectSettings.ExternalEditorArgsFormat;
                externalEditorArgsFormatValue = CheckChange(
                    EditorGUILayout.TextField(k_ExternalEditorFormatLabel, externalEditorArgsFormatValue, GUILayout.ExpandWidth(true)),
                    externalEditorArgsFormatValue);

                ProjectSettings.ExternalEditorArgsFormat = externalEditorArgsFormatValue;
            }

            var args = JsAssetHandler
                .SupportedArguments
                .Select(kvp => $"{kvp.Key}").ToList();
            args.Insert(0, k_SupportedLaunchArguments);
            var argsString = string.Join("\n  ", args);

            EditorGUILayout.Space();

            EditorGUILayout.HelpBox(argsString, MessageType.Info);
        }

        void DrawDotnetDevEnvironment()
        {
            EditorGUILayout.LabelField(k_DotnetEnv, m_Heading1);
            EditorGUILayout.Space();
            var dotnetPathValue = ProjectSettings.DotnetPath;

            dotnetPathValue = CheckChange(
                EditorGUILayout.TextField(k_DotnetPathLabel, dotnetPathValue),
                dotnetPathValue);

            ProjectSettings.DotnetPath = dotnetPathValue;

            EditorGUILayout.Space();

            EditorGUILayout.HelpBox(k_DotnetProjectInfo, MessageType.Info);
        }

        void ApplyButtons()
        {
            GUILayout.FlexibleSpace();

            EditorGUILayout.BeginHorizontal();
            DrawApplyRevertButtons();
            EditorGUILayout.EndHorizontal();
        }

        void DrawApplyRevertButtons()
        {
            GUI.enabled = m_Dirty;
            GUILayout.FlexibleSpace();

            if (GUILayout.Button(k_Revert))
            {
                GUI.FocusControl(null);
                CloudCodeProjectSettings.Load();
                m_Dirty = false;
            }

            if (GUILayout.Button(k_Apply))
            {
                CloudCodeProjectSettings.Save();
                m_Dirty = false;
            }
            GUI.enabled = true;
        }

        string CheckChange(string result, string input)
        {
            if (!m_Dirty && result != input)
            {
                m_Dirty = true;
            }
            return result;
        }
    }
}
