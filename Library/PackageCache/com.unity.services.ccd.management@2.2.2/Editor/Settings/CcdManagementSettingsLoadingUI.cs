using UnityEngine;
using UnityEngine.UIElements;

namespace Unity.Services.Ccd.Management
{
    class CcdManagementSettingsLoadingUI : VisualElement
    {
        public CcdManagementSettingsLoadingUI()
        {
            var container = UIUtils.GetUiFromTemplate(UIConstants.UITemplatePaths.Loading);
            if (container is null)
            {
                var message = string.Format(
                    UIConstants.Formats.TemplateNotFound, nameof(UIConstants.UITemplatePaths.Loading));
                Debug.LogError(message);
                return;
            }
            Add(container);
        }
    }
}
