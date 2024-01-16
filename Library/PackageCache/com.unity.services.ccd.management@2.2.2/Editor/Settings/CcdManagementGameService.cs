using Unity.Services.Core.Editor;
using UnityEditor;

namespace Unity.Services.Ccd.Management
{
    class CcdManagementGameService : IEditorGameService
    {
        public string GetFormattedDashboardUrl()
        {
#if ENABLE_EDITOR_GAME_SERVICES
            return $"https://dashboard.unity3d.com/organizations/{CloudProjectSettings.organizationKey}/projects/{CloudProjectSettings.projectId}/cloud-content-delivery";
#else
            return UIConstants.Urls.Dashboard;
#endif
        }

        public string Name => UIConstants.LocalizedStrings.Ccd;
        public IEditorGameServiceIdentifier Identifier { get; } = new CcdManagementIdentifier();
        public bool RequiresCoppaCompliance => false;
        public bool HasDashboard => true;
        public IEditorGameServiceEnabler Enabler => null;
    }
}
