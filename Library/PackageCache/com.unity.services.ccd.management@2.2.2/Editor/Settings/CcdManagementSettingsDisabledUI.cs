using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Unity.Services.Ccd.Management
{
    class CcdManagementSettingsDisabledUI : VisualElement
    {
        readonly Action m_RefreshDetailUI;
        public CcdManagementSettingsDisabledUI(Action refreshDetailUICallBack)
        {
            m_RefreshDetailUI = refreshDetailUICallBack;
            var container = UIUtils.GetUiFromTemplate(UIConstants.UITemplatePaths.Disabled);
            if (container is null)
            {
                var message = string.Format(
                    UIConstants.Formats.TemplateNotFound, nameof(UIConstants.UITemplatePaths.Disabled));
                Debug.LogError(message);
                return;
            }
            Add(container);

            container.AddOnClickedForButton(OnCheckActivationClicked, UIConstants.UIElementNames.CheckActivation);
            container.AddOnClickedForButton(OnSignUpClicked, UIConstants.UIElementNames.SignUp);
        }

        void OnCheckActivationClicked()
        {
            m_RefreshDetailUI?.Invoke();
        }

        static void OnSignUpClicked()
        {
            Application.OpenURL(UIConstants.Urls.Dashboard);
        }
    }
}
