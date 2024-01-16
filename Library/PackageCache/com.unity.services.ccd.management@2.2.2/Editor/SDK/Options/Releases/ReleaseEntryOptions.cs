using System;
namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for retrieving release entries.
    /// </summary>
    public class ReleaseEntryOptions
    {
        /// <summary>
        /// Id of the bucket to retrieve entries from.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Id of the release to retrieve entries from.
        /// </summary>
        public Guid ReleaseId { get; set; }
        /// <summary>
        /// Label to search from.
        /// </summary>
        public string Label { get; set; } = string.Empty;
        /// <summary>
        /// Create parameters for retrieving release entries.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="releaseId">Id of the release.</param>
        public ReleaseEntryOptions(Guid bucketId, Guid releaseId)
        {
            BucketId = bucketId;
            ReleaseId = releaseId;
        }
    }
}
