// WARNING: Auto generated code. Modifications will be lost!
using System;
using UnityEngine.Analytics;

namespace Unity.Services.CloudCode.Authoring.Editor.Shared.Analytics
{
    interface ICommonAnalytics
    {
        public AnalyticsResult Send(CommonEventPayload payload);

        [Serializable]
        // Naming exception to the standard in order to match the schema
        // ReSharper disable InconsistentNaming
        public struct CommonEventPayload
        {
            public string action;
            public long duration;
            public int count;
            public string context;
            public string environment;
            public string exception;
        }
        // ReSharper restore InconsistentNaming
    }
}
