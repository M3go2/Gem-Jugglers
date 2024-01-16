using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Unity.Services.Ccd.Management.Models;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Service for CCD Management
    /// Provides the ability to manage buckets, badges, content, entries, and releases.
    /// </summary>
    public interface ICcdManagementServiceSdk
    {
        /// <summary>
        /// Async Operation.
        /// Delete a badge.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="badgeName">Name of the badge.</param>
        /// <returns>Awaitable task.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task DeleteBadgeAsync(Guid bucketId, string badgeName);

        /// <summary>
        /// Async Operation.
        /// Get badge.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="badgeName">Name of the badge.</param>
        /// <returns>CcdBadge with specified badge name.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdBadge> GetBadgeAsync(Guid bucketId, string badgeName);

        /// <summary>
        /// Async Operation.
        /// Get badges.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdBadges.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdBadge>> ListBadgesAsync(Guid bucketId, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Assign a badge.
        /// Either "ReleaseId" or "ReleaseNum" should be specified in <paramref name="assignBadgeOptions"/>, but not both.
        /// </summary>
        /// <param name="assignBadgeOptions">Parameters for assigning a badge.</param>
        /// <returns>CcdBadge that was assigned.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdBadge> AssignBadgeAsync(AssignBadgeOptions assignBadgeOptions);

        /// <summary>
        /// Async Operation.
        /// Create bucket.
        /// Required: Name, Description.
        /// </summary>
        /// <param name="createBucketOptions">Parameters for creating a bucket.</param>
        /// <returns>CcdBucket that was created.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdBucket> CreateBucketAsync(CreateBucketOptions createBucketOptions);

        /// <summary>
        /// Async Operation.
        /// Delete a bucket.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <returns>Awaitable task.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task DeleteBucketAsync(Guid bucketId);

        /// <summary>
        /// Async Operation.
        /// Get a bucket.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <returns>CcdBucket with specified Id.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdBucket> GetBucketAsync(Guid bucketId);

        /// <summary>
        /// Async Operation.
        /// Get counts of changes since last release.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <returns>CcdReleaseChangeVersion since the last release.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdReleaseChangeVersion> GetDiffAsync(Guid bucketId);

        /// <summary>
        /// Async Operation.
        /// Get changed entries since last releases.
        /// Required: BucketId.
        /// </summary>
        /// <param name="diffEntriesOptions">Parameters for getting the entries of a diff.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdReleaseentry.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdReleaseEntry>> GetDiffEntriesAsync(DiffEntriesOptions diffEntriesOptions, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Get buckets for project.
        /// </summary>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdBuckets.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdBucket>> ListBucketsAsync(PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Promote release between buckets.
        /// Required: BucketId, FromRelease.
        /// </summary>
        /// <param name="promoteBucketOptions">Parameters for promoting a bucket.</param>
        /// <returns>CcdRelease that was promoted.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdRelease> PromoteBucketAsync(PromoteBucketOptions promoteBucketOptions);

        /// <summary>
        /// Async Operation.
        /// Update a bucket.
        /// </summary>
        /// <param name="updateBucketOptions">Parameters for updating a bucket.</param>
        /// <returns>CcdBucket that was updated.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdBucket> UpdateBucketAsync(UpdateBucketOptions updateBucketOptions);

        /// <summary>
        /// Async Operation.
        /// Create content upload for TUS.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="entryId">Id of the entry.</param>
        /// <returns>Location to upload to via TUS.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<string> CreateContentAsync(Guid bucketId, Guid entryId);

        /// <summary>
        /// Async Operation.
        /// Get content by entryid.
        /// Required: BucketId, EntryId.
        /// </summary>
        /// <param name="entryOptions">Parameters to get content.</param>
        /// <returns>Stream to download content.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<System.IO.Stream> GetContentAsync(EntryOptions entryOptions);

        /// <summary>
        /// Async Operation.
        /// Get content status by entryid.
        /// Required: BucketId, EntryId.
        /// </summary>
        /// <param name="entryOptions">Parameters to get content status.</param>
        /// <returns>ContentStatus of the entry.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<ContentStatus> GetContentStatusAsync(EntryOptions entryOptions);

        /// <summary>
        /// Async Operation.
        /// Get content status for version of entry.
        /// Required: BucketId, EntryId, VersionId.
        /// </summary>
        /// <param name="entryVersionsOption">Parameters for getting the content status by entry version.</param>
        /// <returns>ContentStatus of the entry.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<ContentStatus> GetContentStatusVersionAsync(EntryVersionsOptions entryVersionsOption);

        /// <summary>
        /// Async Operation.
        /// Get content for version of entry.
        /// Required: BucketId, EntryId, VersionId.
        /// </summary>
        /// <param name="entryVersionsOption">Parameters for getting the content by entry version.</param>
        /// <returns>Stream to download content.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<System.IO.Stream> GetContentVersionAsync(EntryVersionsOptions entryVersionsOption);

        /// <summary>
        /// Async Operation.
        /// Upload content for entry.
        /// Required: BucketId, EntryId, File.
        /// </summary>
        /// <param name="uploadContentOptions">Parameters for uploading content.</param>
        /// <returns>Awaitable task.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task UploadContentAsync(UploadContentOptions uploadContentOptions);

        /// <summary>
        /// Async Operation.
        /// Create entry.
        /// Required: BucketId, Path, ContentHash, ContentSize, ContentType.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="entry">Parameters for the entry.</param>
        /// <returns>CcdEntry that was created.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEntry> CreateEntryAsync(Guid bucketId, EntryModelOptions entry);

        /// <summary>
        /// Async Operation.
        /// Create or update entry by path.
        /// Required: BucketId, Path, ContentHash, ContentSize, ContentType.
        /// </summary>
        /// <param name="entryByPathOptions">Parameters for entry path.</param>
        /// <param name="entry">Parameters for the entry.</param>
        /// <param name="updateIfExists">If true, will update the entry if exists. Otherwise, will return exception if the entry exists.</param>
        /// <returns>CcdEntry that was created or updated.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEntry> CreateOrUpdateEntryByPathAsync(EntryByPathOptions entryByPathOptions, EntryModelOptions entry);

        /// <summary>
        /// Async Operation.
        /// Delete entry.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="entryId">Id of the entry.</param>
        /// <returns>Awaitable task.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task DeleteEntryAsync(Guid bucketId, Guid entryId);

        /// <summary>
        /// Async Operation.
        /// Get entries for bucket. GetEntriesAsync(EntryOptions, string, int) is more performant and should be used instead.
        /// Required: BucketId
        /// </summary>
        /// <param name="entryOptions">Parameters for entries.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdEntries.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdEntry>> GetEntriesAsync(EntryOptions entryOptions, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Get entries for bucket.
        /// Required: BucketId
        /// </summary>
        /// <param name="entryOptions">Parameters for entries.</param>
        /// <param name="startingAfter">Last entryid from the previous page. Leave blank for the first page.</param>
        /// <param name="perPage">Number of entries to return per page.</param>
        /// <returns>List of CcdEntries.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdEntry>> GetEntriesAsync(EntryOptions entryOptions, string startingAfter, int perPage = 10);

        /// <summary>
        /// Async Operation.
        /// Get entry.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="entryId">Id of the entry.</param>
        /// <returns>CcdEntry with the specified Id.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEntry> GetEntryAsync(Guid bucketId, Guid entryId);

        /// <summary>
        /// Async Operation.
        /// Get entry by path.
        /// Required: BucketId, Path.
        /// </summary>
        /// <param name="entryByPathOptions">Parameters of the entry.</param>
        /// <returns>CcdEntry with the specified path.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEntry> GetEntryByPathAsync(EntryByPathOptions entryByPathOptions);

        /// <summary>
        /// Async Operation.
        /// Get entry version.
        /// Required: BucketId, EntryId, VersionId.
        /// </summary>
        /// <param name="entryVersionsOption">Parameters for the entry.</param>
        /// <returns>CcdEntry with the specified Version Id.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEntry> GetEntryVersionAsync(EntryVersionsOptions entryVersionsOption);

        /// <summary>
        /// Async Operation.
        /// Get entry versions.
        /// Required: BucketId, EntryId.
        /// </summary>
        /// <param name="entryOptions">Parameters for the entry.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdVersions for the entry.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdVersion>> GetEntryVersionsAsync(EntryOptions entryOptions, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Update entry.
        /// Required: BucketId, EntryId.
        /// </summary>
        /// <param name="entryOptions">Parameters for the entry.</param>
        /// <param name="entry">Properties to update for the entry.</param>
        /// <returns>CcdEntry that was updated.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEntry> UpdateEntryAsync(EntryOptions entryOptions, EntryModelOptions entry);

        /// <summary>
        /// Async Operation.
        /// Update entry by path.
        /// Required: BucketId, Path.
        /// </summary>
        /// <param name="entryByPathOptions">Parameters for the entry by path.</param>
        /// <param name="entry">Properties to update for the entry.</param>
        /// <returns>CcdEntry that was updated.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEntry> UpdateEntryByPathAsync(EntryByPathOptions entryByPathOptions, EntryModelOptions entry);

        /// <summary>
        /// Async Operation.
        /// Gets organization details..
        /// </summary>
        /// <returns>Organization data.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdOrg> GetOrgAsync();

        /// <summary>
        /// Async Operation.
        /// Gets organization Usage Details.
        /// </summary>
        /// <returns>Organization usage.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdOrgUsage> GetOrgUsageAsync();

        /// <summary>
        /// Async Operation.
        /// Create a permission.
        /// Required: BucketId, Action, Permission.
        /// </summary>
        /// <param name="permissionsOptions">Parameters for creating a permission.</param>
        /// <returns>CcdPermission that was created.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdPermission> CreatePermissionAsync(CreatePermissionsOption permissionsOptions);

        /// <summary>
        /// Async Operation.
        /// delete a permission.
        /// Required: BucketId, Action, Permission.
        /// </summary>
        /// <param name="permissionsOptions">Parameters for deleting a permission.</param>
        /// <returns>Awaitable task.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task DeletePermissionAsync(UpdatePermissionsOption permissionsOptions);

        /// <summary>
        /// Async Operation.
        /// Get permissions for bucket.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <returns>List of CcdPermissions for the bucket.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdPermission>> GetPermissionsAsync(Guid bucketId);

        /// <summary>
        /// Async Operation.
        /// Update a permission.
        /// Required: BucketId, Action, Permission.
        /// </summary>
        /// <param name="permissionsOptions">Parameters for updating a permission.</param>
        /// <returns>CcdPermission that was updated.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdPermission> UpdatePermissionAsync(UpdatePermissionsOption permissionsOptions);

        /// <summary>
        /// Async Operation.
        /// Create release.
        /// Required: BucketId.
        /// </summary>
        /// <param name="createReleaseOptions">Parameters for creating a release.</param>
        /// <returns>CcdRelease that was created.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdRelease> CreateReleaseAsync(CreateReleaseOptions createReleaseOptions);

        /// <summary>
        /// Async Operation.
        /// Get release.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="releaseId">Id of the release.</param>
        /// <returns>CcdRelease with the specified Id.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdRelease> GetReleaseAsync(Guid bucketId, Guid releaseId);

        /// <summary>
        /// Async Operation.
        /// Get release by badge.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="badgeName">Name of the badge.</param>
        /// <returns>CcdRelease with the specified badge.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdRelease> GetReleaseByBadgeAsync(Guid bucketId, string badgeName);

        /// <summary>
        /// <para>
        /// Async Operation.
        /// Get counts of changes between releases.
        /// Required: BucketId, (FromReleaseId or FromReleaseNum).
        /// </para>
        /// <para>
        /// Note: Either "FromReleaseId" or "FromReleaseNum" should be specified, but not both. Either "ToReleaseId" or "ToReleaseNum" should be specified, but not both.
        /// </para>
        /// </summary>
        /// <param name="releaseDiffOptions">Parameters for a release diff.</param>
        /// <returns>CcdReleaseChangeVersion of the diff.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdReleaseChangeVersion> GetReleaseDiffAsync(ReleaseDiffOptions releaseDiffOptions);

        /// <summary>
        /// <para>
        /// Async Operation.
        /// Get changed entries between releases.
        /// Required: BucketId, (FromReleaseId or FromReleaseNum).
        /// </para>
        /// <para>
        /// Note: Either "FromReleaseId" or "FromReleaseNum" should be specified, but not both. Either "ToReleaseId" or "ToReleaseNum" should be specified, but not both.
        /// </para>
        /// </summary>
        /// <param name="releaseDiffOptions">Parameters for a release diff.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdReleaseentries of the diff.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdReleaseEntry>> GetReleaseDiffEntriesAsync(ReleaseDiffOptions releaseDiffOptions, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Get release entries.
        /// Required: BucketId, ReleaseId.
        /// </summary>
        /// <param name="releaseEntryOptions">Parameters for release entries.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdReleaseentries for a specified release.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdReleaseEntry>> GetReleaseEntriesAsync(ReleaseEntryOptions releaseEntryOptions, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Get badged release entries.
        /// Required: BucketId, BadgeName.
        /// </summary>
        /// <param name="releaseByBadgeOptions">Parameters for release entries by badge.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdReleaseentries for a specified badged release.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdReleaseEntry>> GetReleaseEntriesByBadgeAsync(ReleaseByBadgeOptions releaseByBadgeOptions, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Get releases for bucket.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of CcdReleases for the specified bucket.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdRelease>> GetReleasesAsync(Guid bucketId, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Get stats for a release.
        /// Required: BucketId, ReleaseId, Metric, Interval.
        /// </summary>
        /// <param name="releaseStatsOptions">Parameters for release stats.</param>
        /// <returns>CcdMetricQuantity for the specified release.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdMetricQuantity> GetStatsAsync(ReleaseStatsOptions releaseStatsOptions);

        /// <summary>
        /// Async Operation.
        /// Update release.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="releaseId">Id of the release.</param>
        /// <param name="notes">Notes to update.</param>
        /// <returns>CcdRelease that was updated.</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdRelease> UpdateReleaseAsync(Guid bucketId, Guid releaseId, string notes);

        /// <summary>
        /// Async Operation.
        /// Get user API key.
        /// </summary>
        /// <returns>User api key</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdUserAPIKey> GetUserApiKeyAsync();

        /// <summary>
        /// Async Operation.
        /// Get user info.
        /// </summary>
        /// <returns>User Info</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdUser> GetUserInfoAsync();

        /// <summary>
        /// Async Operation.
        /// Re-generate user API key.
        /// </summary>
        /// <returns>User api key</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdUserAPIKey> RegenerateUserApiKeyAsync();

        /// <summary>
        /// Async Operation.
        /// Get lists of environments for a project
        /// </summary>
        /// <param name="projectId">Id of the project.</param>
        /// <param name="pageOptions">Pagination options.</param>
        /// <returns>List of environemnts for a project</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<List<CcdEnvironment>> ListEnvironmentsByProjectAsync(Guid projectId, PageOptions pageOptions = default);

        /// <summary>
        /// Async Operation.
        /// Get an environment for a project by name
        /// </summary>
        /// <param name="projectId">Id of the project.</param>
        /// <returns>The named environment for a project</returns>
        /// <exception cref="CcdManagementException"></exception>
        Task<CcdEnvironment> GetEnvironmentByNameAsync(Guid projectId, string name);
    }
}
