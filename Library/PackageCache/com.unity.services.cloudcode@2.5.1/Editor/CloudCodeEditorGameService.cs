using Unity.Services.Core.Editor;
using Unity.Services.Core.Editor.OrganizationHandler;
using UnityEditor;

namespace Unity.Services.CloudCode.Settings
{
    internal struct CloudCodeIdentifier : IEditorGameServiceIdentifier
    {
        public string GetKey() => "Cloud Code";
    }

    internal class CloudCodeEditorGameService : IEditorGameService
    {
        public string Name => "Cloud Code";
        public IEditorGameServiceIdentifier Identifier => k_Identifier;
        public bool RequiresCoppaCompliance => false;
        public bool HasDashboard => true;
        public IEditorGameServiceEnabler Enabler => null;

        static readonly CloudCodeIdentifier k_Identifier = new CloudCodeIdentifier();

        public string GetFormattedDashboardUrl()
        {
            return $"https://dashboard.unity3d.com/organizations/{OrganizationProvider.Organization.Key}/projects/{CloudProjectSettings.projectId}/cloud-code/about";
        }
    }
}
