using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.UI
{
    abstract class AuthoringWindow : EditorWindow
    {
        protected virtual void CreateGUI()
        {
            // This method should be overriden by test windows
            // so as to not use the real RuntimeServices
            CloudCodeAuthoringServices.Instance.InitializeInstance(this);
            LoadGui();
        }

        protected internal abstract void LoadGui();
    }
}
