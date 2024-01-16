using System;
using System.IO;
using Unity.Services.CloudCode.Authoring.Editor.Deployment;
using Unity.Services.CloudCode.Authoring.Editor.Shared.EditorUtils;
using UnityEditor;
using UnityEditor.UIElements;
using UnityEngine;
using UnityEngine.UIElements;

namespace Unity.Services.CloudCode.Authoring.Editor.Modules.UI
{
    [CustomEditor(typeof(CloudCodeModuleReference))]
    [CanEditMultipleObjects]
    class CloudCodeModuleReferenceInspector : UnityEditor.Editor
    {
        static readonly string k_UxmlPath =
            Path.Combine(CloudCodePackage.EditorPath, "Authoring/Modules/UI/Assets/CloudCodeModuleReferenceUi.uxml");

        CloudCodeModuleReference ModuleReference => (CloudCodeModuleReference)serializedObject.targetObject;

        ApplyRevertChangeTracker<CloudCodeModuleReference> m_ChangeTracker;
        VisualElement m_ApplyFooter;
        VisualElement m_GenerateFooter;

        HelpBox m_MessageBox;

        public override VisualElement CreateInspectorGUI()
        {
            DisableReadonlyFlags();
            m_ChangeTracker = new ApplyRevertChangeTracker<CloudCodeModuleReference>(serializedObject);

            var uxmlAsset = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>(k_UxmlPath);
            var rootElement = new VisualElement();
            uxmlAsset.CloneTree(rootElement);

            BindControls(rootElement);

            m_MessageBox = new HelpBox("help", HelpBoxMessageType.Error);
            m_MessageBox.visible = false;
            rootElement.Add(m_MessageBox);

            return rootElement;
        }

        void BindControls(VisualElement rootElement)
        {
            rootElement.Bind(m_ChangeTracker.SerializedObject);

            BindApplyFooter(rootElement);

            foreach (var property in rootElement.Query<PropertyField>().Build())
            {
                property.RegisterValueChangeCallback(_ => UpdateApplyRevertEnabled());
            }

            UpdateApplyRevertEnabled();
        }

        void BindApplyFooter(VisualElement rootElement)
        {
            m_ApplyFooter = rootElement.Q<VisualElement>(UxmlNames.ApplyFooter);
            m_GenerateFooter = rootElement.Q<VisualElement>(UxmlNames.GenerateFooter);

            rootElement.Q<Button>(UxmlNames.Apply).clicked += ApplyChanges;
            rootElement.Q<Button>(UxmlNames.Revert).clicked += RevertChanges;
            rootElement.Q<Button>(UxmlNames.Generate).clicked += GenerateSolution;
        }

        void ApplyChanges()
        {
            var newObj = (CloudCodeModuleReference)m_ChangeTracker.SerializedObject.targetObject;
            if (IsPathValid(newObj.ModulePath))
            {
                m_ChangeTracker.Apply();
                ModuleReference.SaveChanges();
                UpdateApplyRevertEnabled();
                AssetDatabase.Refresh();
            }
            else
            {
                var errorMsg = "Failed to apply the current path - " +
                    "Please make sure your path does not contain any invalid characters and ends with a solution file.";
                UpdateMessageBox(errorMsg, true, HelpBoxMessageType.Error);
            }
        }

        bool IsPathValid(string path)
        {
            bool isValid = Path.GetExtension(path).Equals(".sln") &&
                (path.IndexOfAny(Path.GetInvalidPathChars()) == -1);

            return isValid;
        }

        void RevertChanges()
        {
            m_ChangeTracker.Reset();
            UpdateApplyRevertEnabled();
        }

        void GenerateSolution()
        {
            var task = GenerateSolutionCommand.GenerateSolution(ModuleReference);
            if (task.Exception != null)
            {
                UpdateMessageBox("Solution failed to generate: " + task.Exception?.Message, true, HelpBoxMessageType.Error);
            }
            else
            {
                UpdateMessageBox("Solution generated successfully.", true, HelpBoxMessageType.Info);
            }
        }

        void UpdateMessageBox(string message, bool isVisible, HelpBoxMessageType messageType)
        {
            if (m_MessageBox != null)
            {
                m_MessageBox.text = message;
                m_MessageBox.visible = isVisible;
                m_MessageBox.messageType = messageType;
            }

        }

        void UpdateApplyRevertEnabled()
        {
            m_ApplyFooter.SetEnabled(m_ChangeTracker.IsDirty());
            m_GenerateFooter.SetEnabled(!m_ChangeTracker.IsDirty());
        }

        void DisableReadonlyFlags()
        {
            serializedObject.targetObject.hideFlags = HideFlags.None;
        }

        static class UxmlNames
        {
            public const string Apply = "Apply";
            public const string Revert = "Revert";
            public const string Generate = "Generate";
            public const string ApplyFooter = "Apply Footer";
            public const string GenerateFooter = "Generate Footer";
        }
    }
}
