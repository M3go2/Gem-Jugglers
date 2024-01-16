using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using UnityEditor;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Parameters.UI
{
    [CustomEditor(typeof(CloudCodeParameter))]
    class CloudCodeParameterEditor : UnityEditor.Editor
    {
        SerializedProperty m_Value;
        SerializedProperty m_ParameterType;
        SerializedProperty m_Required;

        void OnEnable()
        {
            m_Value = serializedObject.FindProperty(nameof(CloudCodeParameter.Name));
            m_ParameterType = serializedObject.FindProperty(nameof(CloudCodeParameter.ParameterType));
            m_Required = serializedObject.FindProperty(nameof(CloudCodeParameter.Required));
        }

        public override void OnInspectorGUI()
        {
            serializedObject.UpdateIfRequiredOrScript();

            EditorGUILayout.PropertyField(m_Value, new GUIContent(L10n.Tr("Name")));
            EditorGUILayout.PropertyField(m_ParameterType, new GUIContent(L10n.Tr("Parameter Type")));
            EditorGUILayout.PropertyField(m_Required, new GUIContent(L10n.Tr("Required")));

            serializedObject.ApplyModifiedProperties();
        }
    }
}
