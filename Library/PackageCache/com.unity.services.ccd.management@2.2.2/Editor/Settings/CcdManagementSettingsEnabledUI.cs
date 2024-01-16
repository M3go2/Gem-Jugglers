using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace Unity.Services.Ccd.Management
{
    class CcdManagementSettingsEnabledUI : VisualElement
    {
        public CcdManagementSettingsEnabledUI()
        {
#if ADDRESSABLES_ENABLED
            const string templatePath = UIConstants.UITemplatePaths.EnabledWithAddressables;
#else
            const string templatePath = UIConstants.UITemplatePaths.EnabledWithoutAddressables;
#endif
            var container = UIUtils.GetUiFromTemplate(templatePath);
            if (container is null)
            {
                var message = string.Format(
                    UIConstants.Formats.TemplateNotFound, nameof(templatePath));
                Debug.LogError(message);
                return;
            }
            Add(container);
#if ADDRESSABLES_ENABLED
            container.AddOnClickedForButton(OnManageClicked, UIConstants.UIElementNames.Manage);
#endif
            container.AddOnClickedForElement(OnGuideClicked, UIConstants.UIElementNames.Guide);
            container.AddImage(UIConstants.UITemplatePaths.Image, UIConstants.UIElementNames.EnabledImage);
        }

        static void OnManageClicked()
        {
            EditorApplication.ExecuteMenuItem(UIConstants.MenuPaths.AddressablesProfiles);
        }

        static void OnGuideClicked()
        {
            Application.OpenURL(UIConstants.Urls.Guide);
        }
    }
}
