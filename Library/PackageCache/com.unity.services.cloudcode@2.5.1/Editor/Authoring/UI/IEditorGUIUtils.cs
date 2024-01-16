using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.UI
{
    interface IEditorGUIUtils
    {
        void HelpBox(string message, MessageType messageType);
        void PropertyField(SerializedProperty serializedProperty);
        void BeginDisabledGroup(bool disabled);
        void EndDisabledGroup();
    }
}
