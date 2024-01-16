using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for retrieving entries or entry versions.
    /// </summary>
    public class EntryOptions
    {
        /// <summary>
        /// Id of bucket to manage entry.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Id of the entry
        /// </summary>
        public Guid EntryId { get; set; }
        /// <summary>
        /// Version Id of the entry.
        /// </summary>
        public Guid VersionId { get; set; }
        /// <summary>
        /// Path of the entry.
        /// </summary>
        public string Path { get; set; } = string.Empty;
        /// <summary>
        /// Label of the entry.
        /// </summary>
        public string Label { get; set; } = string.Empty;
        /// <summary>
        /// Create parameters for retrieving entries.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="entryId">Id of the entry.</param>
        public EntryOptions(Guid bucketId, Guid entryId)
        {
            BucketId = bucketId;
            EntryId = entryId;
        }
    }
}
