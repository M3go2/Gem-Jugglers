using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for entry versions.
    /// </summary>
    public class EntryVersionsOptions
    {
        /// <summary>
        /// Id of bucket to manage entry.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Id of the entry.
        /// </summary>
        public Guid EntryId { get; set; }
        /// <summary>
        /// Id of the version of the entry.
        /// </summary>
        public Guid VersionId { get; set; }
        /// <summary>
        /// Create parameters for entry versions.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="entryId">Id of the entry.</param>
        /// <param name="versionId">Id of the version.</param>
        public EntryVersionsOptions(Guid bucketId, Guid entryId, Guid versionId)
        {
            BucketId = bucketId;
            EntryId = entryId;
            VersionId = versionId;
        }
    }
}
