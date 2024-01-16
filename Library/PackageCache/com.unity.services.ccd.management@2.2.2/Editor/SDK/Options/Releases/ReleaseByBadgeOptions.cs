using System;
namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for retrieving release entries.
    /// </summary>
    public class ReleaseByBadgeOptions
    {
        /// <summary>
        /// Id of the bucket to retrieve entries from.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// name of the badge to retrieve entries from.
        /// </summary>
        public string BadgeName { get; set; }
        /// <summary>
        /// Label to search from.
        /// </summary>
        public string Label { get; set; } = string.Empty;
        /// <summary>
        /// Create parameters for retrieving release entries.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="badgeName">Name of the badge.</param>
        public ReleaseByBadgeOptions(Guid bucketId, string badgeName)
        {
            BucketId = bucketId;
            BadgeName = badgeName;
        }
    }
}
