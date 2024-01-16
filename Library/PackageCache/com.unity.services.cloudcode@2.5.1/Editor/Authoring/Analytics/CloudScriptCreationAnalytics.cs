using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Analytics
{
    class CloudScriptCreationAnalytics
    {
        const string k_EventNameCreate = "cloudcode_filecreated";
        const int k_VersionCreate = 1;

        public CloudScriptCreationAnalytics()
        {
            EditorAnalytics.RegisterEventWithLimit(k_EventNameCreate, AnalyticsConstants.k_MaxEventPerHour, AnalyticsConstants.k_MaxItems, AnalyticsConstants.k_VendorKey, k_VersionCreate);
        }

        public void SendCreatedEvent()
        {
            EditorAnalytics.SendEventWithLimit(k_EventNameCreate, null, k_VersionCreate);
        }
    }
}
