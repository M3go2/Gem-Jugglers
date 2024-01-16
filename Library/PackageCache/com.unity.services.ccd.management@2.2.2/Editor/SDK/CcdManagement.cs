using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Unity.Services.Ccd.Management.Apis.Badges;
using Unity.Services.Ccd.Management.Apis.Buckets;
using Unity.Services.Ccd.Management.Apis.Content;
using Unity.Services.Ccd.Management.Apis.Default;
using Unity.Services.Ccd.Management.Apis.Entries;
using Unity.Services.Ccd.Management.Apis.Environments;
using Unity.Services.Ccd.Management.Apis.Orgs;
using Unity.Services.Ccd.Management.Apis.Permissions;
using Unity.Services.Ccd.Management.Apis.Releases;
using Unity.Services.Ccd.Management.Apis.Users;
using Unity.Services.Ccd.Management.ErrorMitigation;
using Unity.Services.Ccd.Management.Http;
using UnityEditor;

[assembly: InternalsVisibleTo("Unity.Services.Ccd.Management.Editor.Tests")]

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Here is the first point and call for accessing the CCD Management Package's features!
    /// Use the .Instance method to get a singleton of the ICCDManagementServiceSDK and from there you can make various requests to the CCD Management service API.
    /// Note: Your project must have cloud services enabled and connected to a Unity Cloud Project.
    /// </summary>
    public static class CcdManagement
    {
        internal static ICcdManagementServiceSdk service;

        private static readonly Configuration configuration;
        internal static IHttpClient client;

        internal static string accessToken;
        internal static string userId;
        internal static string projectid;
        internal static string environmentid;

        /// <summary>
        /// Sets the configuration base path
        /// </summary>
        /// <param name="basePath">The base path to be set for the configuration.</param>
        public static void SetBasePath(string basePath)
        {
            configuration.BasePath = basePath;
        }

        /// <summary>
        /// Sets the http timeout in milliseconds
        /// </summary>
        /// <param name="timeoutms">The number of milliseonds to wait before timing out.</param>
        public static void SetTimeout(int timeoutms)
        {
            configuration.RequestTimeout = timeoutms;
        }

        /// <summary>
        /// Sets the environment for the project
        /// </summary>
        /// <param name="envId"></param>
        public static void SetEnvironmentId(string envId)
        {
            environmentid = envId;
        }

        static CcdManagement()
        {
            configuration = new Configuration("https://services.unity.com", 10, 4, new Dictionary<string, string>(), new RetryPolicyConfig(), new StatusCodePolicyConfig());
        }

        internal static Action instanceCallbacks;

        internal static void RefreshCloudSettings()
        {
            userId = CloudProjectSettings.userId;
            projectid = CloudProjectSettings.projectId;
            accessToken = CloudProjectSettings.accessToken;
        }

        [InitializeOnLoadMethod]
        static void OnLoad()
        {
            instanceCallbacks += RefreshCloudSettings;
        }

        /// <summary>
        /// Provides the CCD Management Service SDK interface for making service API requests.
        /// </summary>
        public static ICcdManagementServiceSdk Instance
        {
            get
            {
                instanceCallbacks?.Invoke();

                if (client == null)
                {
                    client = new HttpClient();
                }

                if (service == null)
                {
                    instanceCallbacks = RefreshCloudSettings;

                    // Need to initialize here without using UnityServices.InitializeAsync due to these features being mainly Editor specific.

                    service = new WrappedCcdManagementService(
                        new BadgesApiClient(client),
                        new BucketsApiClient(client),
                        new ContentApiClient(client),
                        new DefaultApiClient(client),
                        new EntriesApiClient(client),
                        new EnvironmentsApiClient(client),
                        new OrgsApiClient(client),
                        new PermissionsApiClient(client),
                        new ReleasesApiClient(client),
                        new UsersApiClient(client),
                        configuration, client);
                }
                return service;
            }
        }
    }
}
