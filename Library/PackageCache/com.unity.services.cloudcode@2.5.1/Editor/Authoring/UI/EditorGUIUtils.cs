using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.UI
{
    class EditorGUIUtils : IEditorGUIUtils
    {
        public void HelpBox(string message, MessageType messageType)
        {
            EditorGUILayout.HelpBox(message, messageType);
        }

        public void PropertyField(SerializedProperty serializedProperty)
        {
            EditorGUILayout.PropertyField(serializedProperty);
        }

        public void BeginDisabledGroup(bool disabled)
        {
            EditorGUI.BeginDisabledGroup(disabled);
        }

        public void EndDisabledGroup()
        {
            EditorGUI.EndDisabledGroup();
        }
    }
}
