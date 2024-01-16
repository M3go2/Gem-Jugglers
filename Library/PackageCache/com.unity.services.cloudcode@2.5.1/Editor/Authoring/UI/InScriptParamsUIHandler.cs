using Unity.Services.CloudCode.Authoring.Editor.Parameters;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.UI
{
    class InScriptParamsUIHandler
    {
        internal static readonly string k_UsingInScript = L10n.Tr("In-Script parameters have been detected. Editor parameters are read only.");
        internal static readonly string k_InScriptWithoutProject = L10n.Tr("This script has been imported using In-Script parameters but the project is not initialized correctly. Please re-initialize the project for parameters to update correctly.");

        IEditorGUIUtils m_EditorGUI;

        public InScriptParamsUIHandler(IEditorGUIUtils editorGUI)
        {
            m_EditorGUI = editorGUI;
        }

        public void Handle(SerializedProperty parameters, ParameterSource source, bool isProjectInitialized)
        {
            if (!isProjectInitialized && source == ParameterSource.InScript)
            {
                m_EditorGUI.HelpBox(k_InScriptWithoutProject, MessageType.Warning);
            }

            var isDisabled = source == ParameterSource.InScript && isProjectInitialized;
            if (isDisabled)
            {
                m_EditorGUI.HelpBox(k_UsingInScript, MessageType.Info);
                m_EditorGUI.BeginDisabledGroup(true);
            }

            m_EditorGUI.PropertyField(parameters);

            if (isDisabled)
            {
                m_EditorGUI.EndDisabledGroup();
            }
        }
    }
}
