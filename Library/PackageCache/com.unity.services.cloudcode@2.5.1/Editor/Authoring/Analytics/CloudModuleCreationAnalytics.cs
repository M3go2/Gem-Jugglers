using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Analytics
{
    class CloudModuleCreationAnalytics
    {
        const string k_EventNameReferenceCreate = "cloudcode_referencecreated";
        const string k_EventNameModuleCreate = "cloudcode_modulecreated";
        const int k_VersionCreate = 1;

        public CloudModuleCreationAnalytics()
        {
            EditorAnalytics.RegisterEventWithLimit(k_EventNameReferenceCreate, AnalyticsConstants.k_MaxEventPerHour, AnalyticsConstants.k_MaxItems, AnalyticsConstants.k_VendorKey, k_VersionCreate);
            EditorAnalytics.RegisterEventWithLimit(k_EventNameModuleCreate, AnalyticsConstants.k_MaxEventPerHour, AnalyticsConstants.k_MaxItems, AnalyticsConstants.k_VendorKey, k_VersionCreate);
        }

        public void SendReferenceCreatedEvent()
        {
            EditorAnalytics.SendEventWithLimit(k_EventNameReferenceCreate, null, k_VersionCreate);
        }

        public void SendModuleCreatedEvent()
        {
            EditorAnalytics.SendEventWithLimit(k_EventNameModuleCreate, null, k_VersionCreate);
        }
    }
}
