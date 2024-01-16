//-----------------------------------------------------------------------------
// <auto-generated>
//     This file was generated by the C# SDK Code Generator.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//-----------------------------------------------------------------------------


using Unity.Services.Ccd.Management.Apis.Badges;
using Unity.Services.Ccd.Management.Apis.BucketAccessTokens;
using Unity.Services.Ccd.Management.Apis.Buckets;
using Unity.Services.Ccd.Management.Apis.Content;
using Unity.Services.Ccd.Management.Apis.Default;
using Unity.Services.Ccd.Management.Apis.Entries;
using Unity.Services.Ccd.Management.Apis.Environments;
using Unity.Services.Ccd.Management.Apis.Orgs;
using Unity.Services.Ccd.Management.Apis.Permissions;
using Unity.Services.Ccd.Management.Apis.Releases;
using Unity.Services.Ccd.Management.Apis.Users;


namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// CcdManagementService
    /// </summary>
    internal static class CcdManagementService
    {
        /// <summary>
        /// The static instance of CcdManagementService.
        /// </summary>
        public static ICcdManagementService Instance { get; internal set; }
    }

    /// <summary> Interface for CcdManagementService</summary>
    internal interface ICcdManagementService
    {
        
        /// <summary> Accessor for BadgesApi methods.</summary>
        IBadgesApiClient BadgesApi { get; set; }
        
        /// <summary> Accessor for BucketAccessTokensApi methods.</summary>
        IBucketAccessTokensApiClient BucketAccessTokensApi { get; set; }
        
        /// <summary> Accessor for BucketsApi methods.</summary>
        IBucketsApiClient BucketsApi { get; set; }
        
        /// <summary> Accessor for ContentApi methods.</summary>
        IContentApiClient ContentApi { get; set; }
        
        /// <summary> Accessor for DefaultApi methods.</summary>
        IDefaultApiClient DefaultApi { get; set; }
        
        /// <summary> Accessor for EntriesApi methods.</summary>
        IEntriesApiClient EntriesApi { get; set; }
        
        /// <summary> Accessor for EnvironmentsApi methods.</summary>
        IEnvironmentsApiClient EnvironmentsApi { get; set; }
        
        /// <summary> Accessor for OrgsApi methods.</summary>
        IOrgsApiClient OrgsApi { get; set; }
        
        /// <summary> Accessor for PermissionsApi methods.</summary>
        IPermissionsApiClient PermissionsApi { get; set; }
        
        /// <summary> Accessor for ReleasesApi methods.</summary>
        IReleasesApiClient ReleasesApi { get; set; }
        
        /// <summary> Accessor for UsersApi methods.</summary>
        IUsersApiClient UsersApi { get; set; }
        

        /// <summary> Configuration properties for the service.</summary>
        Configuration Configuration { get; set; }
    }
}