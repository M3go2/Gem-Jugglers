// WARNING: Auto generated code. Modifications will be lost!
using UnityEditor;
using UnityEngine.Analytics;

namespace Unity.Services.CloudCode.Authoring.Editor.Shared.Analytics
{
    class CommonAnalytics : ICommonAnalytics
    {
        public const string eventName = "shared_common";
        public const int version = 1;

        public AnalyticsResult Send(ICommonAnalytics.CommonEventPayload payload)
        {
            return EditorAnalytics.SendEventWithLimit(eventName, payload, version);
        }
    }
}
