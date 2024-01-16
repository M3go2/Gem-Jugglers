using UnityEditor;

namespace Unity.Services.Ccd.Management
{
    static class UIConstants
    {
        public static class StyleSheetPaths
        {
            public const string Common = "Packages/com.unity.services.ccd.management/Editor/USS/CcdManagementStyleSheet.uss";
        }

        public static class UITemplatePaths
        {
            public const string Common = "Packages/com.unity.services.ccd.management/Editor/UXML/CcdManagementSettingsCommon.uxml";

            public const string EnabledWithAddressables = "Packages/com.unity.services.ccd.management/Editor/UXML/CcdManagementSettingsEnabledwAddr.uxml";

            public const string EnabledWithoutAddressables = "Packages/com.unity.services.ccd.management/Editor/UXML/CcdManagementSettingsEnabledwoAddr.uxml";

            public const string Disabled = "Packages/com.unity.services.ccd.management/Editor/UXML/CcdManagementSettingsDisabled.uxml";

            public const string Loading = "Packages/com.unity.services.ccd.management/Editor/UXML/CcdManagementSettingsLoading.uxml";

            public const string Image = "Packages/com.unity.services.ccd.management/Editor/UXML/images/CcdEnabled.png";
        }

        public static class UIElementNames
        {
            public const string Dashboard = "Dashboard";

            public const string LearnMoreLink = "LearnMore";

            public const string SignUp = "SignUpForCCD";

            public const string CheckActivation = "CheckCCDActivation";

            public const string Manage = "Manage";

            public const string Support = "Support";

            public const string Guide = "Guide";

            public const string EnabledImage = "EnabledImage";

            public const string ApiDoc = "ApiDoc";
        }

        public static class LocalizedStrings
        {
            public static readonly string Ccd = L10n.Tr("Cloud Content Delivery");

            public static readonly string Description = L10n.Tr("Cloud Content Delivery (CCD) is a managed cloud service that hosts and delivers live content to your application’s users worldwide.");
        }

        public static class Formats
        {
            public const string TemplateNotFound = "No UI template found for Cloud Content Delivery Service {0}.";
        }

        public static class Urls
        {
            public const string LearnMore = "https://unity.com/products/cloud-content-delivery";

            public const string Dashboard = "https://dashboard.unity3d.com/cloud-content-delivery";

            public const string Support = "https://docs.unity.com/ccd/Content/UnityCCD-support.html";

            public const string Guide = "https://docs.unity.com/ccd/Content/UnityCCDWalkthrough.html";

            public const string ApiDoc = "https://content-api.cloud.unity3d.com/doc/";
        }

        public static class MenuPaths
        {
            public const string ServiceMenuRoot = "Services/Cloud Content Delivery/";

            public const string AddressablesProfiles = "Window/Asset Management/Addressables/Profiles";
        }
    }
}
