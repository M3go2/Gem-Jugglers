using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for updating a bucket.
    /// </summary>
    public class UpdateBucketOptions
    {
        /// <summary>
        /// Id of the bucket to update.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Description of bucket to update.
        /// </summary>
        public string Description { get; set; } = string.Empty;
        /// <summary>
        /// Name of bucket to update.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Create Parameters for updating a bucket.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="name">New name of the bucket.</param>
        public UpdateBucketOptions(Guid bucketId, string name)
        {
            BucketId = bucketId;
            Name = name;
        }
    }
}
