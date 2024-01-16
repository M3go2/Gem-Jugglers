using UnityEditor;

namespace Unity.Services.Ccd.Management
{
    static class CcdManagementTopMenu
    {
        const int k_ConfigureMenuPriority = 100;

        [MenuItem(UIConstants.MenuPaths.ServiceMenuRoot + "Configure", priority = k_ConfigureMenuPriority)]
        static void ShowProjectSettings()
        {
            SettingsService.OpenProjectSettings(CcdManagementSettingsProvider.GetSettingsPath());
        }
    }
}
