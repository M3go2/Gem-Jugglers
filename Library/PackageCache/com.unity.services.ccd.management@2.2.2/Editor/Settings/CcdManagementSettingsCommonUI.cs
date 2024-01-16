using UnityEngine;
using UnityEngine.UIElements;

namespace Unity.Services.Ccd.Management
{
    class CcdManagementSettingsCommonUI : VisualElement
    {
        public CcdManagementSettingsCommonUI()
        {
            var container = UIUtils.GetUiFromTemplate(UIConstants.UITemplatePaths.Common);
            if (container is null)
            {
                var message = string.Format(
                    UIConstants.Formats.TemplateNotFound, nameof(UIConstants.UITemplatePaths.Common));
                Debug.LogError(message);
                return;
            }
            Add(container);


            container.AddOnClickedForElement(OnDashboardClicked, UIConstants.UIElementNames.Dashboard);
            container.AddOnClickedForElement(OnApiDocClicked, UIConstants.UIElementNames.ApiDoc);
            container.AddOnClickedForElement(OnLearnMoreClicked, UIConstants.UIElementNames.LearnMoreLink);
            container.AddOnClickedForElement(OnSupportClicked, UIConstants.UIElementNames.Support);
        }

        static void OnLearnMoreClicked()
        {
            Application.OpenURL(UIConstants.Urls.LearnMore);
        }

        static void OnDashboardClicked()
        {
            Application.OpenURL(UIConstants.Urls.Dashboard);
        }

        static void OnSupportClicked()
        {
            Application.OpenURL(UIConstants.Urls.Support);
        }

        static void OnApiDocClicked()
        {
            Application.OpenURL(UIConstants.Urls.ApiDoc);
        }
    }
}
