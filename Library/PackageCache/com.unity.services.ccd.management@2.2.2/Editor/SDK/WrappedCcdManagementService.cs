using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
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
using Unity.Services.Ccd.Management.Badges;
using Unity.Services.Ccd.Management.Buckets;
using Unity.Services.Ccd.Management.Content;
using Unity.Services.Ccd.Management.Entries;
using Unity.Services.Ccd.Management.Environments;
using Unity.Services.Ccd.Management.Http;
using Unity.Services.Ccd.Management.Models;
using Unity.Services.Ccd.Management.Orgs;
using Unity.Services.Ccd.Management.Permissions;
using Unity.Services.Ccd.Management.Releases;
using Unity.Services.Ccd.Management.Users;
using Unity.Services.Core;
using UnityEngine;
using UnityEngine.Networking;
using HttpClient = System.Net.Http.HttpClient;

[assembly: InternalsVisibleTo("Unity.Services.Ccd.Management.Editor.Tests")]
namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// The CCD Management enables clients to manage CCD resources.
    /// </summary>
    internal class WrappedCcdManagementService : ICcdManagementServiceSdk, ICcdManagementServiceSdkConfiguration
    {
        internal IBadgesApiClient BadgesApiClient;
        internal IBucketsApiClient BucketsApiClient;
        internal IContentApiClient ContentApiClient;
        internal IDefaultApiClient DefaultApiClient;
        internal IEntriesApiClient EntriesApiClient;
        internal IEnvironmentsApiClient EnvironmentsApiClient;
        internal IOrgsApiClient OrgsApiClient;
        internal IPermissionsApiClient PermissionsApiClient;
        internal IReleasesApiClient ReleasesApiClient;
        internal IUsersApiClient UsersApiClient;
        internal Configuration Configuration;
        private IHttpClient _HttpClient;
        private HttpClient m_StreamContentClient;
        private ConcurrentDictionary<Guid, Tuple<string, string>> m_SignedUrls = new ConcurrentDictionary<Guid, Tuple<string, string>>();

        //CCD Management Error base value (used to elevate standard errors if unhandled)
        internal const int CCD_MANAGEMENT_ERROR_BASE_VALUE = 19000;
        internal const string AUTH_HEADER = "Authorization";
        internal const string CONTENT_TYPE_HEADER = "Content-Type";
        internal const string CONTENT_LENGTH_HEADER = "Content-Length";
        internal const string SERVICES_ERROR_MSG = "Cloud Services must enabled and connected to a Unity Cloud Project.";
        internal const string MISSING_SIGNED_URL = "Missing signed URL needed for uploading the entry's content.";

        internal WrappedCcdManagementService(
            IBadgesApiClient badgesApiClient, IBucketsApiClient bucketsApiClient, IContentApiClient contentApiClient,
            IDefaultApiClient defaultApiClient, IEntriesApiClient entriesApiClient, IEnvironmentsApiClient environmentsApiClient,
            IOrgsApiClient orgsApiClient, IPermissionsApiClient permissionsApiClient, IReleasesApiClient releasesApiClient,
            IUsersApiClient usersApiClient, Configuration configuration, IHttpClient httpClient)
        {
            BadgesApiClient = badgesApiClient;
            BucketsApiClient = bucketsApiClient;
            ContentApiClient = contentApiClient;
            DefaultApiClient = defaultApiClient;
            EntriesApiClient = entriesApiClient;
            EnvironmentsApiClient = environmentsApiClient;
            OrgsApiClient = orgsApiClient;
            PermissionsApiClient = permissionsApiClient;
            ReleasesApiClient = releasesApiClient;
            UsersApiClient = usersApiClient;
            Configuration = configuration;
            _HttpClient = httpClient;
            m_StreamContentClient = new HttpClient();
        }

        public async Task DeleteBadgeAsync(Guid bucketId, string badgeName)
        {
            var request = new DeleteBadgeEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), badgeName, CcdManagement.projectid);
            await TryCatchRequest(BadgesApiClient.DeleteBadgeEnvAsync, request);
        }

        public async Task<CcdBadge> GetBadgeAsync(Guid bucketId, string badgeName)
        {
            var request = new GetBadgeEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), badgeName, CcdManagement.projectid);
            var response = await TryCatchRequest(BadgesApiClient.GetBadgeEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdBadge>> ListBadgesAsync(Guid bucketId, PageOptions pageOptions = default)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new ListBadgesEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), CcdManagement.projectid, pageOptions.Page, pageOptions.PerPage);
            var response = await TryCatchRequest(BadgesApiClient.ListBadgesEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdBadge> AssignBadgeAsync(AssignBadgeOptions updateBadgeOptions)
        {
            bool hasReleaseId = updateBadgeOptions.ReleaseId != default;
            bool hasReleaseNum = updateBadgeOptions.ReleaseNum.HasValue;
            CcdBadgeAssign badgeAssign;
            if (hasReleaseId)
            {
                badgeAssign = new CcdBadgeAssign(updateBadgeOptions.BadgeName, updateBadgeOptions.ReleaseId.ToString());
            }
            else if (hasReleaseNum)
            {
                badgeAssign = new CcdBadgeAssign(updateBadgeOptions.BadgeName, null, updateBadgeOptions.ReleaseNum.ToString());
            }
            else
            {
                throw new CcdManagementException(CcdManagementErrorCodes.InvalidArgument, "Cannot have both ReleaseId and ReleaseNum present.");
            }
            var request = new UpdateBadgeEnvRequest(
                CcdManagement.environmentid, updateBadgeOptions.BucketId.ToString(), CcdManagement.projectid, badgeAssign);
            var response = await TryCatchRequest(BadgesApiClient.UpdateBadgeEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdBucket> CreateBucketAsync(CreateBucketOptions createBucketOptions)
        {
            var request = new CreateBucketByProjectEnvRequest(
                CcdManagement.environmentid, CcdManagement.projectid,
                new CcdBucketCreate(createBucketOptions.Name, Guid.Parse(CcdManagement.projectid), createBucketOptions.Description, false));
            var response = await TryCatchRequest(BucketsApiClient.CreateBucketByProjectEnvAsync, request);
            return response.Result;
        }

        public async Task DeleteBucketAsync(Guid bucketId)
        {
            var request = new DeleteBucketEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), CcdManagement.projectid);
            await TryCatchRequest(BucketsApiClient.DeleteBucketEnvAsync, request);
        }

        public async Task<CcdBucket> GetBucketAsync(Guid bucketId)
        {
            var request = new GetBucketEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), CcdManagement.projectid);
            var response = await TryCatchRequest(BucketsApiClient.GetBucketEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdReleaseChangeVersion> GetDiffAsync(Guid bucketId)
        {
            var request = new GetDiffEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), CcdManagement.projectid);
            var response = await TryCatchRequest(BucketsApiClient.GetDiffEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdReleaseEntry>> GetDiffEntriesAsync(DiffEntriesOptions diffEntriesOptions, PageOptions pageOptions)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }

            var request = new GetDiffEntriesEnvRequest(
                CcdManagement.environmentid,
                diffEntriesOptions.BucketId.ToString(),
                CcdManagement.projectid,
                pageOptions.Page,
                pageOptions.PerPage,
                diffEntriesOptions.Path,
                diffEntriesOptions.IncludeStates);
            var response = await TryCatchRequest(BucketsApiClient.GetDiffEntriesEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdRelease> PromoteBucketAsync(PromoteBucketOptions promoteBucketOptions)
        {
            var request = new PromoteBucketEnvRequest(
                CcdManagement.environmentid, promoteBucketOptions.BucketId.ToString(), CcdManagement.projectid,
                new CcdPromoteBucket(promoteBucketOptions.FromRelease, promoteBucketOptions.BucketId, promoteBucketOptions.Notes));
            var response = await TryCatchRequest(BucketsApiClient.PromoteBucketEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdBucket> UpdateBucketAsync(UpdateBucketOptions updateBucketOptions)
        {
            var request = new UpdateBucketEnvRequest(
                CcdManagement.environmentid, updateBucketOptions.BucketId.ToString(), CcdManagement.projectid,
                new CcdBucketUpdate(updateBucketOptions.Description, updateBucketOptions.Name));
            var response = await TryCatchRequest(BucketsApiClient.UpdateBucketEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdBucket>> ListBucketsAsync(PageOptions pageOptions = default)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new ListBucketsByProjectEnvRequest(
                CcdManagement.environmentid, CcdManagement.projectid, pageOptions.Page, pageOptions.PerPage);
            var response = await TryCatchRequest(BucketsApiClient.ListBucketsByProjectEnvAsync, request);
            return response.Result;
        }

        public async Task<string> CreateContentAsync(Guid bucketId, Guid entryId)
        {
            var request = new CreateContentRequest(
                CcdManagement.environmentid, bucketId.ToString(), entryId.ToString(), CcdManagement.projectid);
            var response = await TryCatchRequest(InternalCreateContent, request);
            string location;
            response.Headers.TryGetValue("location", out location);
            return location;
        }

        private async Task<Response> InternalCreateContent(CreateContentRequest request, Configuration config)
        {
            var headers = request.ConstructHeaders(config);
            if (headers.ContainsKey(CONTENT_TYPE_HEADER))
            {
                headers[CONTENT_TYPE_HEADER] = " ";
            }
            else
            {
                headers.Add(CONTENT_TYPE_HEADER, " ");
            }

            var response = await _HttpClient.MakeRequestAsync(
                UnityWebRequest.kHttpVerbPOST,
                request.ConstructUrl(config.BasePath),
                null,
                headers,
                config.RequestTimeout.Value,
                config.RetryPolicyConfiguration,
                config.StatusCodePolicyConfiguration);

            if (response.IsHttpError || response.IsNetworkError)
            {
                throw new HttpException(response);
            }

            return new Response(response);
        }

        public async Task<Stream> GetContentAsync(EntryOptions entryOptions)
        {
            GetContentEnvRequest request = new GetContentEnvRequest(
                CcdManagement.environmentid, entryOptions.BucketId.ToString(), entryOptions.EntryId.ToString(), CcdManagement.projectid, entryOptions.VersionId != default ? entryOptions.VersionId.ToString() : null);
            var response = await TryCatchRequest(ContentApiClient.GetContentEnvAsync, request);
            return response.Result;
        }

        public async Task<ContentStatus> GetContentStatusAsync(EntryOptions entryOptions)
        {
            GetContentStatusEnvRequest request = new GetContentStatusEnvRequest(
                CcdManagement.environmentid, entryOptions.BucketId.ToString(), entryOptions.EntryId.ToString(), CcdManagement.projectid, entryOptions.VersionId != default ? entryOptions.VersionId.ToString() : null);
            var response = await TryCatchRequest(ContentApiClient.GetContentStatusEnvAsync, request);
            return GetContentStatusFromResponse(response);
        }

        public async Task<ContentStatus> GetContentStatusVersionAsync(EntryVersionsOptions entryVersionsOption)
        {
            var request = new GetContentStatusVersionEnvRequest(
                CcdManagement.environmentid,
                entryVersionsOption.BucketId.ToString(),
                entryVersionsOption.EntryId.ToString(),
                entryVersionsOption.VersionId.ToString(),
                CcdManagement.projectid);
            var response = await TryCatchRequest(ContentApiClient.GetContentStatusVersionEnvAsync, request);
            return GetContentStatusFromResponse(response);
        }

        public async Task<Stream> GetContentVersionAsync(EntryVersionsOptions entryVersionsOption)
        {
            var request = new GetContentVersionEnvRequest(
                CcdManagement.environmentid,
                entryVersionsOption.BucketId.ToString(),
                entryVersionsOption.EntryId.ToString(),
                entryVersionsOption.VersionId.ToString(),
                CcdManagement.projectid);
            var response = await TryCatchRequest(ContentApiClient.GetContentVersionEnvAsync, request);
            return response.Result;
        }

        public async Task UploadContentAsync(UploadContentOptions uploadContentOptions)
        {
            if (m_SignedUrls.ContainsKey(uploadContentOptions.EntryId))
            {
                await InternalUploadAsync(uploadContentOptions);
            }
        }

        private async Task InternalUploadAsync(UploadContentOptions uploadContentOptions)
        {
            var(signedUrl, contentType) = m_SignedUrls[uploadContentOptions.EntryId];
            var streamContent = new StreamContent(uploadContentOptions.File);
            if (!string.IsNullOrEmpty(contentType))
            {
                streamContent.Headers.Add(CONTENT_TYPE_HEADER, contentType);
            }
            var response = await m_StreamContentClient.PutAsync(signedUrl, streamContent);
            if (!response.IsSuccessStatusCode)
            {
                ResolveErrorWrapping((int)response.StatusCode, new Exception(response.ReasonPhrase));
            }
            m_SignedUrls.TryRemove(uploadContentOptions.EntryId, out _);
        }

        public async Task<CcdEntry> CreateEntryAsync(Guid bucketId, EntryModelOptions entry)
        {
            var entryCreate = new CcdEntryCreate(entry.Path, entry.ContentHash, entry.ContentSize, entry.ContentType, entry.Labels, entry.Metadata, true);
            var request = new CreateEntryEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), CcdManagement.projectid, entryCreate);
            var response = await TryCatchRequest(EntriesApiClient.CreateEntryEnvAsync, request);
            if (string.IsNullOrEmpty(response.Result.SignedUrl))
            {
                throw new Exception(MISSING_SIGNED_URL);
            }
            m_SignedUrls[response.Result.Entryid] = new Tuple<string, string>(response.Result.SignedUrl, response.Result.ContentType);
            return response.Result;
        }

        public async Task<CcdEntry> CreateOrUpdateEntryByPathAsync(EntryByPathOptions entryByPathOptions, EntryModelOptions entry)
        {
            var needSignedUrl = !await IsUpToDate(entryByPathOptions, entry);
            var entryCreateOrUpdate = new CcdEntryCreateByPath(entry.ContentHash, entry.ContentSize, entry.ContentType, entry.Labels, entry.Metadata, needSignedUrl);
            var request = new CreateOrUpdateEntryByPathEnvRequest(
                CcdManagement.environmentid, entryByPathOptions.BucketId.ToString(), entryByPathOptions.Path, CcdManagement.projectid, entryCreateOrUpdate, entry.UpdateIfExists);
            var response = await TryCatchRequest(EntriesApiClient.CreateOrUpdateEntryByPathEnvAsync, request);
            switch (needSignedUrl)
            {
                case true when string.IsNullOrEmpty(response.Result.SignedUrl):
                    throw new Exception(MISSING_SIGNED_URL);
                case true:
                    m_SignedUrls[response.Result.Entryid] = new Tuple<string, string>(response.Result.SignedUrl, response.Result.ContentType);
                    break;
            }
            return response.Result;
        }

        private async Task<bool> IsUpToDate(EntryByPathOptions entryByPathOptions, EntryModelOptions entry)
        {
            try
            {
                var remoteEntry = await GetEntryByPathAsync(entryByPathOptions);
                return IsUpToDate(remoteEntry, entry.ContentSize, entry.ContentHash);
            }
            catch (Exception)
            {
                return false;
            }
        }

        private async Task<bool> IsUpToDate(EntryOptions entryOptions, EntryModelOptions entry)
        {
            try
            {
                var remoteEntry = await GetEntryAsync(entryOptions.BucketId, entryOptions.EntryId);
                return IsUpToDate(remoteEntry, entry.ContentSize, entry.ContentHash);
            }
            catch (Exception)
            {
                return false;
            }
        }

        private static bool IsUpToDate(CcdEntry remoteEntry, int localContentSize, string localContentHash)
        {
            var sameSize = remoteEntry.ContentSize == localContentSize;
            var sameHash = !string.IsNullOrEmpty(remoteEntry.ContentHash) && remoteEntry.ContentHash == localContentHash;
            return remoteEntry.Complete && sameSize && sameHash;
        }

        public async Task DeleteEntryAsync(Guid bucketId, Guid entryId)
        {
            var request = new DeleteEntryEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), entryId.ToString(), CcdManagement.projectid);
            await TryCatchRequest(EntriesApiClient.DeleteEntryEnvAsync, request);
        }

        // GetEntriesAsync(EntryOptions, string, int) is more performant and should be used instead.
        public async Task<List<CcdEntry>> GetEntriesAsync(EntryOptions entryOptions, PageOptions pageOptions = default)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new GetEntriesEnvRequest(
                CcdManagement.environmentid, entryOptions.BucketId.ToString(), CcdManagement.projectid, pageOptions.Page, Guid.Empty, pageOptions.PerPage, entryOptions.Path, entryOptions.Label, null, null, null);
            var response = await TryCatchRequest(EntriesApiClient.GetEntriesEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdEntry>> GetEntriesAsync(EntryOptions entryOptions, string startingAfter, int perPage = 10)
        {
            var request = new GetEntriesEnvRequest(
                CcdManagement.environmentid, entryOptions.BucketId.ToString(), CcdManagement.projectid, 1, Guid.Parse(startingAfter), perPage, entryOptions.Path, entryOptions.Label, null, null, null);
            var response = await TryCatchRequest(EntriesApiClient.GetEntriesEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdEntry> GetEntryAsync(Guid bucketId, Guid entryId)
        {
            var request = new GetEntryEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), entryId.ToString(), CcdManagement.projectid);
            var response = await TryCatchRequest(EntriesApiClient.GetEntryEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdEntry> GetEntryByPathAsync(EntryByPathOptions entryByPathOptions)
        {
            GetEntryByPathEnvRequest request = new GetEntryByPathEnvRequest(
                CcdManagement.environmentid,
                entryByPathOptions.BucketId.ToString(),
                entryByPathOptions.Path,
                CcdManagement.projectid,
                entryByPathOptions.VersionId != default ? entryByPathOptions.VersionId.ToString() : null);
            var response = await TryCatchRequest(EntriesApiClient.GetEntryByPathEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdEntry> GetEntryVersionAsync(EntryVersionsOptions entryVersionsOption)
        {
            var request = new GetEntryVersionEnvRequest(
                CcdManagement.environmentid,
                entryVersionsOption.BucketId.ToString(),
                entryVersionsOption.EntryId.ToString(),
                entryVersionsOption.VersionId.ToString(),
                CcdManagement.projectid);
            var response = await TryCatchRequest(EntriesApiClient.GetEntryVersionEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdVersion>> GetEntryVersionsAsync(EntryOptions entryOptions, PageOptions pageOptions = default)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new GetEntryVersionsEnvRequest(
                CcdManagement.environmentid,
                entryOptions.BucketId.ToString(),
                entryOptions.EntryId.ToString(),
                CcdManagement.projectid,
                entryOptions.Label,
                pageOptions.Page,
                pageOptions.PerPage);
            var response = await TryCatchRequest(EntriesApiClient.GetEntryVersionsEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdEntry> UpdateEntryAsync(EntryOptions entryOptions, EntryModelOptions entry)
        {
            var needSignedUrl = !await IsUpToDate(entryOptions, entry);
            var entryUpdate = new CcdEntryUpdate(entry.ContentHash, entry.ContentSize, entry.ContentType, entry.Labels, entry.Metadata, needSignedUrl);
            var request = new UpdateEntryEnvRequest(
                CcdManagement.environmentid,
                entryOptions.BucketId.ToString(),
                entryOptions.EntryId.ToString(),
                CcdManagement.projectid,
                entryUpdate);
            var response = await TryCatchRequest(EntriesApiClient.UpdateEntryEnvAsync, request);
            switch (needSignedUrl)
            {
                case true when string.IsNullOrEmpty(response.Result.SignedUrl):
                    throw new Exception(MISSING_SIGNED_URL);
                case true:
                    m_SignedUrls[response.Result.Entryid] = new Tuple<string, string>(response.Result.SignedUrl, response.Result.ContentType);
                    break;
            }
            return response.Result;
        }

        public async Task<CcdEntry> UpdateEntryByPathAsync(EntryByPathOptions entryByPathOptions, EntryModelOptions entry)
        {
            var needSignedUrl = !await IsUpToDate(entryByPathOptions, entry);
            var entryUpdateByPath = new CcdEntryUpdate(entry.ContentHash, entry.ContentSize, entry.ContentType, entry.Labels, entry.Metadata, needSignedUrl);
            var request = new UpdateEntryByPathEnvRequest(
                CcdManagement.environmentid,
                entryByPathOptions.BucketId.ToString(),
                entryByPathOptions.Path,
                CcdManagement.projectid,
                entryUpdateByPath);
            var response = await TryCatchRequest(EntriesApiClient.UpdateEntryByPathEnvAsync, request);
            switch (needSignedUrl)
            {
                case true when string.IsNullOrEmpty(response.Result.SignedUrl):
                    throw new Exception(MISSING_SIGNED_URL);
                case true:
                    m_SignedUrls[response.Result.Entryid] = new Tuple<string, string>(response.Result.SignedUrl, response.Result.ContentType);
                    break;
            }
            return response.Result;
        }

        public async Task<CcdOrg> GetOrgAsync()
        {
            var proj = (await TryCatchRequest(InternalGetOrgData, CcdManagement.projectid)).Result;
            var request = new GetOrgRequest(proj.organizationGenesisId);
            var response = await TryCatchRequest(OrgsApiClient.GetOrgAsync, request);
            return response.Result;
        }

        public async Task<CcdOrgUsage> GetOrgUsageAsync()
        {
            var proj = (await TryCatchRequest(InternalGetOrgData, CcdManagement.projectid)).Result;
            var request = new GetOrgUsageRequest(proj.organizationGenesisId);
            var response = await TryCatchRequest(OrgsApiClient.GetOrgUsageAsync, request);
            return response.Result;
        }

        private async Task<Response<ProjectData>> InternalGetOrgData(string projectId, Configuration config)
        {
            ProjectData projectData;
            var url = $"{config.BasePath}/api/unity/v1/projects/{projectId}";
            var headers = config.Headers.ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
            var clientResponse = await _HttpClient.MakeRequestAsync(
                UnityWebRequest.kHttpVerbGET,
                url,
                null,
                headers,
                config.RequestTimeout.Value,
                config.RetryPolicyConfiguration,
                config.StatusCodePolicyConfiguration);
            if (clientResponse.IsHttpError || clientResponse.IsNetworkError)
            {
                //Custom call so we want to catch Authorization error for retry
                if (clientResponse.StatusCode == (int)HttpStatusCode.Forbidden)
                {
                    throw new HttpException<AuthorizationError>(
                        clientResponse,
                        new AuthorizationError(
                            clientResponse.ErrorMessage,
                            (int)clientResponse.StatusCode,
                            Encoding.Default.GetString(clientResponse.Data)));
                }
                else
                {
                    throw new HttpException(clientResponse);
                }
            }
            projectData = ProjectData.ParseProjectData(Encoding.Default.GetString(clientResponse.Data));
            return new Response<ProjectData>(clientResponse, projectData);
        }

        public async Task<CcdPermission> CreatePermissionAsync(CreatePermissionsOption permissionsOptions)
        {
            var request = new CreatePermissionByBucketEnvRequest(
                CcdManagement.environmentid, permissionsOptions.BucketId.ToString(), CcdManagement.projectid,
                new CcdPermissionCreate(permissionsOptions.Action, permissionsOptions.Permission));
            var response = await TryCatchRequest(PermissionsApiClient.CreatePermissionByBucketEnvAsync, request);
            return response.Result;
        }

        public async Task DeletePermissionAsync(UpdatePermissionsOption permissionsOptions)
        {
            string permission = permissionsOptions.Permission.ToString();
            var request = new DeletePermissionByBucketEnvRequest(
                CcdManagement.environmentid,
                permissionsOptions.BucketId.ToString(), CcdManagement.projectid,
                permission: permissionsOptions.Permission.ToString().ToLower(),
                action: permissionsOptions.Action.ToString().ToLower());
            await TryCatchRequest(PermissionsApiClient.DeletePermissionByBucketEnvAsync, request);
        }

        public async Task<List<CcdPermission>> GetPermissionsAsync(Guid bucketId)
        {
            var request = new GetAllByBucketEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), CcdManagement.projectid);
            var response = await TryCatchRequest(PermissionsApiClient.GetAllByBucketEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdPermission> UpdatePermissionAsync(UpdatePermissionsOption permissionsOptions)
        {
            var request = new UpdatePermissionByBucketEnvRequest(
                CcdManagement.environmentid, permissionsOptions.BucketId.ToString(), CcdManagement.projectid,
                new CcdPermissionUpdate(permissionsOptions.Action, permissionsOptions.Permission));
            var response = await TryCatchRequest(PermissionsApiClient.UpdatePermissionByBucketEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdRelease> CreateReleaseAsync(CreateReleaseOptions createReleaseOptions)
        {
            var releaseCreate = new CcdReleaseCreate(createReleaseOptions.Entries, createReleaseOptions.Metadata, createReleaseOptions.Notes, createReleaseOptions.Snapshot);
            var request = new CreateReleaseEnvRequest(
                CcdManagement.environmentid, createReleaseOptions.BucketId.ToString(), CcdManagement.projectid, releaseCreate);
            var response = await TryCatchRequest(ReleasesApiClient.CreateReleaseEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdRelease> GetReleaseAsync(Guid bucketId, Guid releaseId)
        {
            var request = new GetReleaseEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), releaseId.ToString(), CcdManagement.projectid);
            var response = await TryCatchRequest(ReleasesApiClient.GetReleaseEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdRelease> GetReleaseByBadgeAsync(Guid bucketId, string badgeName)
        {
            var request = new GetReleaseByBadgeEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), badgeName, CcdManagement.projectid);
            var response = await TryCatchRequest(ReleasesApiClient.GetReleaseByBadgeEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdReleaseChangeVersion> GetReleaseDiffAsync(ReleaseDiffOptions releaseDiffOptions)
        {
            bool hasReleaseId = releaseDiffOptions.FromReleaseId != default && releaseDiffOptions.ToReleaseId != default;
            bool hasReleaseNum = releaseDiffOptions.FromReleaseNum.HasValue && releaseDiffOptions.ToReleaseNum.HasValue;
            GetReleaseDiffEnvRequest request;
            if (hasReleaseId && !hasReleaseNum)
            {
                request = new GetReleaseDiffEnvRequest(
                    CcdManagement.environmentid,
                    releaseDiffOptions.BucketId.ToString(),
                    CcdManagement.projectid,
                    releaseDiffOptions.FromReleaseId.ToString(),
                    null,
                    releaseDiffOptions.ToReleaseId.ToString(),
                    null);
            }
            else if (hasReleaseNum && !hasReleaseId)
            {
                request = new GetReleaseDiffEnvRequest(
                    CcdManagement.environmentid,
                    releaseDiffOptions.BucketId.ToString(),
                    CcdManagement.projectid,
                    null,
                    releaseDiffOptions.FromReleaseNum.ToString(),
                    null,
                    releaseDiffOptions.ToReleaseNum.ToString());
            }
            else
            {
                throw new CcdManagementException(CcdManagementErrorCodes.InvalidArgument, "Cannot have both ReleaseId and ReleaseNum present.");
            }
            var response = await TryCatchRequest(ReleasesApiClient.GetReleaseDiffEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdReleaseEntry>> GetReleaseDiffEntriesAsync(ReleaseDiffOptions releaseDiffOptions, PageOptions pageOptions = null)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            bool hasReleaseId = releaseDiffOptions.FromReleaseId != default && releaseDiffOptions.ToReleaseId != default;
            bool hasReleaseNum = releaseDiffOptions.FromReleaseNum.HasValue && releaseDiffOptions.ToReleaseNum.HasValue;
            GetReleaseDiffEntriesEnvRequest request;

            if (hasReleaseId && !hasReleaseNum)
            {
                request = new GetReleaseDiffEntriesEnvRequest(
                    CcdManagement.environmentid,
                    releaseDiffOptions.BucketId.ToString(),
                    releaseDiffOptions.FromReleaseId.ToString(),
                    CcdManagement.projectid,
                    null,
                    releaseDiffOptions.ToReleaseId.ToString(),
                    null,
                    pageOptions.Page,
                    pageOptions.PerPage,
                    releaseDiffOptions.Path,
                    releaseDiffOptions.Include_States);
            }
            else if (hasReleaseNum && !hasReleaseId)
            {
                request = new GetReleaseDiffEntriesEnvRequest(
                    CcdManagement.environmentid,
                    releaseDiffOptions.BucketId.ToString(),
                    CcdManagement.projectid,
                    null,
                    releaseDiffOptions.FromReleaseNum.ToString(),
                    null,
                    releaseDiffOptions.ToReleaseNum.ToString(),
                    pageOptions.Page,
                    pageOptions.PerPage,
                    releaseDiffOptions.Path,
                    releaseDiffOptions.Include_States);
            }
            else
            {
                throw new CcdManagementException(CcdManagementErrorCodes.InvalidArgument, "Cannot have both ReleaseId and ReleaseNum present.");
            }

            var response = await TryCatchRequest(ReleasesApiClient.GetReleaseDiffEntriesEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdReleaseEntry>> GetReleaseEntriesAsync(ReleaseEntryOptions releaseEntryOptions, PageOptions pageOptions = null)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new GetReleaseEntriesEnvRequest(
                CcdManagement.environmentid, releaseEntryOptions.BucketId.ToString(), releaseEntryOptions.ReleaseId.ToString(),
                CcdManagement.projectid, releaseEntryOptions.Label, pageOptions.Page, pageOptions.PerPage);
            var response = await TryCatchRequest(ReleasesApiClient.GetReleaseEntriesEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdReleaseEntry>> GetReleaseEntriesByBadgeAsync(ReleaseByBadgeOptions releaseByBadgeOptions, PageOptions pageOptions = null)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new GetReleaseEntriesByBadgeEnvRequest(
                CcdManagement.environmentid,
                releaseByBadgeOptions.BucketId.ToString(),
                releaseByBadgeOptions.BadgeName,
                CcdManagement.projectid,
                releaseByBadgeOptions.Label,
                pageOptions.Page,
                pageOptions.PerPage);
            var response = await TryCatchRequest(ReleasesApiClient.GetReleaseEntriesByBadgeEnvAsync, request);
            return response.Result;
        }

        public async Task<List<CcdRelease>> GetReleasesAsync(Guid bucketId, PageOptions pageOptions = null)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new GetReleasesEnvRequest(
                CcdManagement.environmentid, bucketId.ToString(), CcdManagement.projectid, pageOptions.Page, pageOptions.PerPage);
            var response = await TryCatchRequest(ReleasesApiClient.GetReleasesEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdMetricQuantity> GetStatsAsync(ReleaseStatsOptions releaseStatsOptions)
        {
            var request = new GetStatsEnvRequest(
                CcdManagement.environmentid,
                releaseStatsOptions.BucketId.ToString(),
                releaseStatsOptions.ReleaseId.ToString(),
                releaseStatsOptions.Metric.ToString().ToLower(),
                releaseStatsOptions.Interval.ToString().ToLower(),
                CcdManagement.projectid);
            var response = await TryCatchRequest(ReleasesApiClient.GetStatsEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdRelease> UpdateReleaseAsync(Guid bucketId, Guid releaseId, string notes)
        {
            var request = new UpdateReleaseEnvRequest(
                CcdManagement.environmentid,
                bucketId.ToString(), releaseId.ToString(), CcdManagement.projectid,
                new CcdReleaseUpdate(notes));
            var response = await TryCatchRequest(ReleasesApiClient.UpdateReleaseEnvAsync, request);
            return response.Result;
        }

        public async Task<CcdUserAPIKey> GetUserApiKeyAsync()
        {
            var request = new GetUserApiKeyRequest(CcdManagement.userId);
            var response = await TryCatchRequest(UsersApiClient.GetUserApiKeyAsync, request);
            return response.Result;
        }

        public async Task<CcdUser> GetUserInfoAsync()
        {
            var request = new GetUserInfoRequest(CcdManagement.userId);
            var response = await TryCatchRequest(UsersApiClient.GetUserInfoAsync, request);
            return response.Result;
        }

        public async Task<CcdUserAPIKey> RegenerateUserApiKeyAsync()
        {
            var apiKeyResult = (await TryCatchRequest(UsersApiClient.GetUserApiKeyAsync, new GetUserApiKeyRequest(CcdManagement.userId))).Result;
            var request = new RegenerateUserApiKeyRequest(CcdManagement.userId, new CcdUserAPIKey(apiKeyResult.Apikey));
            var response = await TryCatchRequest(UsersApiClient.RegenerateUserApiKeyAsync, request);
            return response.Result;
        }

        public async Task<List<CcdEnvironment>> ListEnvironmentsByProjectAsync(Guid projectId, PageOptions pageOptions = default)
        {
            if (pageOptions == null)
            {
                pageOptions = new PageOptions();
            }
            var request = new ListEnvironmentsByProjectRequest(
                projectId.ToString(), pageOptions.Page, Guid.Empty, pageOptions.PerPage);
            var response = await TryCatchRequest(EnvironmentsApiClient.ListEnvironmentsByProjectAsync, request, false);
            return response.Result;
        }

        public async Task<CcdEnvironment> GetEnvironmentByNameAsync(Guid projectId, string name)
        {
            var pageOptions = new PageOptions();
            pageOptions.PerPage = 100;
            List<CcdEnvironment> environments = await ListEnvironmentsByProjectAsync(projectId, pageOptions);
            foreach (var environment in environments)
            {
                if (environment.Name == name)
                {
                    return environment;
                }
            }
            return null;
        }

        /// <summary>
        /// Sets the base path of the config
        /// </summary>
        /// <param name="basePath">base path</param>
        public void SetBasePath(string basePath)
        {
            Configuration.BasePath = basePath;
        }

        /// <summary>
        /// Sets the http timeout in milliseconds
        /// </summary>
        /// <param name="timoutms">The number of milliseonds to wait before timing out.</param>
        public void SetTimeout(int timeoutms)
        {
            Configuration.RequestTimeout = timeoutms;
        }

        // Helper function to reduce code duplication of try-catch
        private async Task<Response> TryCatchRequest<TRequest>(Func<TRequest, Configuration, Task<Response>> func, TRequest request)
        {
            if (string.IsNullOrEmpty(CcdManagement.projectid))
            {
                throw new CcdManagementException(CommonErrorCodes.InvalidRequest, SERVICES_ERROR_MSG);
            }
            Response response = null;
            try
            {
                if (!AuthHeaderConfigured(Configuration))
                {
                    await SetConfigurationAuthHeader(Configuration);
                }

                try
                {
                    await SetDefaultEnvironmentIfNotExists(Configuration);
                    response = await func(request, Configuration);
                }
                catch (HttpException<AuthorizationError>)
                {
                    ClearAuthHeader(Configuration);
                    await SetConfigurationAuthHeader(Configuration);
                    await SetDefaultEnvironmentIfNotExists(Configuration);
                    response = await func(request, Configuration);
                }
            }
            catch (HttpException he)
            {
                ResolveErrorWrapping((int)he.Response.StatusCode, he);
            }
            catch (Exception e)
            {
                //Pass error code that will throw default label, provide exception object for stack trace.
                ResolveErrorWrapping(CommonErrorCodes.Unknown, e);
            }
            return response;
        }

        // Helper function to reduce code duplication of try-catch (generic version)
        private async Task<Response<TReturn>> TryCatchRequest<TRequest, TReturn>(
            Func<TRequest, Configuration, Task<Response<TReturn>>> func, TRequest request)
        {
            return await TryCatchRequest(func, request, true);
        }

        private async Task<Response<TReturn>> TryCatchRequest<TRequest, TReturn>(Func<TRequest, Configuration, Task<Response<TReturn>>> func, TRequest request, bool doEnvironmentLookup)
        {
            if (string.IsNullOrEmpty(CcdManagement.projectid))
            {
                throw new CcdManagementException(CommonErrorCodes.InvalidRequest, SERVICES_ERROR_MSG);
            }

            Response<TReturn> response = null;
            try
            {
                if (!AuthHeaderConfigured(Configuration))
                {
                    await SetConfigurationAuthHeader(Configuration);
                }


                try
                {
                    if (doEnvironmentLookup)
                    {
                        await SetDefaultEnvironmentIfNotExists(Configuration);
                    }

                    response = await func(request, Configuration);
                }
                catch (HttpException<AuthorizationError>)
                {
                    ClearAuthHeader(Configuration);
                    await SetConfigurationAuthHeader(Configuration);
                    await SetDefaultEnvironmentIfNotExists(Configuration);
                    response = await func(request, Configuration);
                }
            }
            catch (HttpException he)
            {
                ResolveErrorWrapping((int)he.Response.StatusCode, he);
            }
            catch (Exception e)
            {
                //Pass error code that will throw default label, provide exception object for stack trace.
                ResolveErrorWrapping(CommonErrorCodes.Unknown, e);
            }
            return response;
        }

        /// <summary>
        /// Sets the default environment from the identity api if none is set
        /// </summary>
        /// <param name="config">config</param>
        /// <returns></returns>
        private async Task SetDefaultEnvironmentIfNotExists(Configuration config)
        {
            if (string.IsNullOrEmpty(CcdManagement.environmentid))
            {
                var pageOptions = new PageOptions();
                pageOptions.Page = 1;
                pageOptions.PerPage = 100;
                var environments = await ListEnvironmentsByProjectAsync(Guid.Parse(CcdManagement.projectid), pageOptions);
                var defaultEnvironments = environments.Where(x => x.IsDefault == true);
                if (defaultEnvironments.Count() == 0)
                {
                    throw new CcdManagementValidationException(200, "no default environment found");
                }
                CcdManagement.SetEnvironmentId(defaultEnvironments.First().Id.ToString());
            }
        }

        // Helper function to resolve the new wrapped error/exception based on input parameter
        internal static void ResolveErrorWrapping(int reason, Exception exception = null)
        {
            int code = MapErrorCode(reason);
            //Check http exception types
            HttpException<AuthenticationError> authenticationException = exception as HttpException<AuthenticationError>;
            if (authenticationException != null)
            {
                throw new CcdManagementException(code, $"{authenticationException.ActualError.Title}. {authenticationException.ActualError.Detail}", exception);
            }
            HttpException<AuthorizationError> authorizationException = exception as HttpException<AuthorizationError>;
            if (authorizationException != null)
            {
                throw new CcdManagementException(code, $"{authorizationException.ActualError.Title}. {authorizationException.ActualError.Detail}", exception);
            }
            HttpException<ConflictError> conflictException = exception as HttpException<ConflictError>;
            if (conflictException != null)
            {
                throw new CcdManagementException(code, $"{conflictException.ActualError.Title}. {conflictException.ActualError.Detail}", exception);
            }
            HttpException<InternalServerError> internalServerException = exception as HttpException<InternalServerError>;
            if (internalServerException != null)
            {
                throw new CcdManagementException(code, internalServerException.ActualError.Title, exception);
            }
            HttpException<NotFoundError> notFoundException = exception as HttpException<NotFoundError>;
            if (notFoundException != null)
            {
                throw new CcdManagementException(code, $"{notFoundException.ActualError.Title}. {notFoundException.ActualError.Detail}", exception);
            }
            HttpException<ValidationError> validationException = exception as HttpException<ValidationError>;
            if (validationException != null)
            {
                var details = new List<object>();
                foreach (var detail in validationException.ActualError.Details)
                {
                    details.Add(detail);
                }
                throw new CcdManagementValidationException(code, $"{validationException.ActualError.Title}. {String.Join(", ", validationException.ActualError.Details)}", exception)
                {
                    Details = details
                };
            }
            HttpException<ServiceUnavailableError> serviceException = exception as HttpException<ServiceUnavailableError>;
            if (serviceException != null)
            {
                throw new CcdManagementException(code, "Service Unavailable", exception);
            }
            HttpException<TooManyRequestsError> tooManyRequestException = exception as HttpException<TooManyRequestsError>;
            if (tooManyRequestException != null)
            {
                throw new CcdManagementException(code, $"{tooManyRequestException.ActualError.Title}. {tooManyRequestException.ActualError.Detail}", exception);
            }
            //Other general exception message handling
            throw new CcdManagementException(code, exception.Message, exception);
        }

        /// <summary>
        /// Maps internal service error code or http error code to SDK error code
        /// </summary>
        /// <param name="reason">Error code to match</param>
        /// <returns></returns>
        internal static int MapErrorCode(int reason)
        {
            switch (reason)
            {
                case 001:
                    return CcdManagementErrorCodes.InvalidArgument;
                case 002:
                case 416:
                    return CcdManagementErrorCodes.OutOfRange;
                case 010:
                    return CcdManagementErrorCodes.InactiveOrganization;
                case 011:
                    return CcdManagementErrorCodes.InvalidHashMismatch;
                case 009:
                case 400:
                    return CommonErrorCodes.InvalidRequest;
                case 003:
                case 401:
                    return CcdManagementErrorCodes.Unauthorized;
                case 004:
                case 403:
                    return CommonErrorCodes.Forbidden;
                case 005:
                case 404:
                    return CommonErrorCodes.NotFound;
                case 408:
                    return CommonErrorCodes.Timeout;
                case 006:
                case 409:
                    return CcdManagementErrorCodes.AlreadyExists;
                case 012:
                case 429:
                    return CommonErrorCodes.TooManyRequests;
                case 008:
                case 500:
                    return CcdManagementErrorCodes.InternalError;
                case 503:
                    return CommonErrorCodes.ServiceUnavailable;
                case 007:
                default:
                    return CommonErrorCodes.Unknown;
            }
        }

        internal static bool AuthHeaderConfigured(Configuration config)
        {
            string auth;
            config.Headers.TryGetValue(AUTH_HEADER, out auth);
            if (string.IsNullOrEmpty(auth))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        internal static void ClearAuthHeader(Configuration config)
        {
            config.Headers.Remove(AUTH_HEADER);
        }

        private async Task SetConfigurationAuthHeader(Configuration config)
        {
            if (string.IsNullOrEmpty(CcdManagement.accessToken))
            {
                throw new CcdManagementException(CommonErrorCodes.InvalidRequest, SERVICES_ERROR_MSG);
            }

            var jsonString = JsonConvert.SerializeObject(new Token() { TokenValue = CcdManagement.accessToken });
            var url = $"{config.BasePath}/api/auth/v1/genesis-token-exchange/unity/";
            var headers = config.Headers.ToDictionary(kvp => kvp.Key, kvp => string.Join(", ", kvp.Value));
            if (headers.ContainsKey(CONTENT_TYPE_HEADER))
            {
                headers[CONTENT_TYPE_HEADER] = "application/json";
            }
            else
            {
                headers[CONTENT_TYPE_HEADER] = "application/json";
            }
            var clientResponse = await _HttpClient.MakeRequestAsync(
                UnityWebRequest.kHttpVerbPOST,
                url,
                Encoding.Default.GetBytes(jsonString),
                headers,
                config.RequestTimeout.Value,
                config.RetryPolicyConfiguration,
                config.StatusCodePolicyConfiguration);
            if (clientResponse.IsHttpError || clientResponse.IsNetworkError)
            {
                throw new HttpException(clientResponse);
            }
            var token = JsonConvert.DeserializeObject<Token>(Encoding.Default.GetString(clientResponse.Data)).TokenValue;
            var tokenValue = $"Bearer {token}";

            if (config.Headers.ContainsKey(AUTH_HEADER))
            {
                config.Headers[AUTH_HEADER] = tokenValue;
            }
            else
            {
                config.Headers.Add(AUTH_HEADER, tokenValue);
            }
        }

        internal static ContentStatus GetContentStatusFromResponse(Response response)
        {
            string uploadHash, uploadLengthString, uploadOffsetString;
            response.Headers.TryGetValue("upload-hash", out uploadHash);
            response.Headers.TryGetValue("upload-length", out uploadLengthString);
            response.Headers.TryGetValue("upload-offset", out uploadOffsetString);

            int uploadLength, uploadOffset;
            bool parsed = true;
            var parsedLength = int.TryParse(uploadLengthString, out uploadLength);
            var parsedOffset = int.TryParse(uploadOffsetString, out uploadOffset);
            parsed = parsedLength && parsedOffset && parsed;
            if (!parsed)
            {
                throw new Exception("Could not parse upload-length or upload-offset from request header.");
            }

            return new ContentStatus(uploadHash, uploadLength, uploadOffset);
        }

        /// <summary>
        /// Access Token
        /// </summary>
        internal class Token
        {
            [JsonProperty("token")]
            public string TokenValue;
        }
    }
}
