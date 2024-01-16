namespace Unity.Services.Ccd.Management.Samples
{
    /// <summary>
    /// Sample builder example to use with the command line. This file must be copied into your Assets/Editor folder.
    ///
    /// Launching Unity on your platform
    /// On macOS, type the following into the Terminal to launch Unity:
    /// /Applications/Unity/Hub/Editor/<version>/Unity.app/Contents/MacOS/Unity -projectPath <project path>
    /// 
    /// On Linux, type the following into the Terminal to launch Unity:
    /// /Applications/Unity/Hub/Editor/<version>/Unity.app/Contents/Linux/Unity -projectPath <project path>
    /// 
    /// On Windows, type the following into the Command Prompt to launch Unity:
    /// "C:\Program Files\Unity\Hub\Editor\<version>\Editor\Unity.exe" -projectPath "<project path>"
    ///
    /// And add those configuration arguments:
    /// -username <username> -password <password> -executeMethod Unity.Services.Ccd.Management.Samples.Builder.NewContentBuild -batchmode -logFile <pathname>
    /// NOTE: the form -username=<username> -password=<password> will NOT work
    ///
    /// Buid Methods:
    /// New build: Unity.Services.Ccd.Management.Samples.Builder.NewContentBuild
    /// Update existing build: Unity.Services.Ccd.Management.Samples.Builder.UpdateContentBuild
    /// 
    /// Do not use the -quit flag as the script will quit on its own.
    ///
    /// </summary>
    public class Builder
    {
        private static bool Start;
        private static bool Update;
        private static bool Done;
        private static int ExitCode;

        public static void CheckBuildStatus()
        {
            if (Start && CloudProjectSettings.projectId != "" && CloudProjectSettings.accessToken != "")
            {
                Debug.Log("Starting build");
                Start = false;
                DoBuild();
            }
            if (Done)
            {
                Debug.Log("Done");
                EditorApplication.Exit(ExitCode);
            }

        }


        public static void NewContentBuild()
        {
            Debug.Log("Starting New Build");
            var instance = CcdManagement.Instance;
            UnityEditor.EditorApplication.update += CheckBuildStatus;
            Update = false;
            Start = true;
        }
        public static void UpdateContentBuild()
        {
            Debug.Log("Starting Update Build");
            UnityEditor.EditorApplication.update += CheckBuildStatus;
            Update = true;
            Start = true;
        }

        public static async void DoBuild()
        {
            try
            {
                AddressableAssetSettings settings = AddressableAssetSettingsDefaultObject.Settings;

                if (Update)
                {
                    await AddressableAssetSettings.UpdateAndReleasePlayerContent().ConfigureAwait(false);
                } else
                {
                    await AddressableAssetSettings.BuildAndReleasePlayerContent().ConfigureAwait(false);
                }
            }
            catch (Exception e)
            {
                Debug.LogError(e);
                ExitCode = 1;

            }
            finally
            {
                Done = true;
            }
        }
    }
}
