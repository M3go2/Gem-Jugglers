using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for promoting a bucket.
    /// </summary>
    public class PromoteBucketOptions
    {
        /// <summary>
        /// Id of bucket to promote.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Id of release to promote from.
        /// </summary>
        public Guid FromRelease { get; set; }
        /// <summary>
        /// Notes of promotion release.
        /// </summary>
        public string Notes { get; set; } = string.Empty;
        /// <summary>
        /// Create parameters fro promoting a bucket.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="fromRelease">Id of the release to promote from.</param>
        public PromoteBucketOptions(Guid bucketId, Guid fromRelease)
        {
            BucketId = bucketId;
            FromRelease = fromRelease;
        }
    }
}
