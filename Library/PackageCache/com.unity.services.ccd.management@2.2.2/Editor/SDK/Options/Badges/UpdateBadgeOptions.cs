using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for assigning a badge.
    /// Either "ReleaseId" or "ReleaseNum" should be specified, but not both.
    /// </summary>
    public class AssignBadgeOptions
    {
        /// <summary>
        /// Id of bucket to manage permission.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Name of the badge to update.
        /// </summary>
        public string BadgeName { get; set; }
        /// <summary>
        /// The release id of the badge to update.
        /// </summary>
        public Guid ReleaseId { get; set; }
        /// <summary>
        /// The release number of the badge to update.
        /// </summary>
        public int? ReleaseNum { get; set; }
        /// <summary>
        /// Create parameters object for assigning a badge.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="badgeName">Name of the badge.</param>
        /// <param name="releaseId">Id of the release.</param>
        public AssignBadgeOptions(Guid bucketId, string badgeName, Guid releaseId)
        {
            BucketId = bucketId;
            BadgeName = badgeName;
            ReleaseId = releaseId;
        }

        /// <summary>
        /// Create parameters object for assigning a badge.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="badgeName">Name of the badge.</param>
        /// <param name="releaseId">Id of the release.</param>
        public AssignBadgeOptions(Guid bucketId, string badgeName, int releaseNum)
        {
            BucketId = bucketId;
            BadgeName = badgeName;
            ReleaseNum = releaseNum;
        }
    }
}
