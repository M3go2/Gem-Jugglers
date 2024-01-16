using System;
using System.Collections.Generic;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for requesting the changed entries since the last release.
    /// </summary>
    public class DiffEntriesOptions
    {
        /// <summary>
        /// Id of the bucket.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Path to request.
        /// </summary>
        public string Path { get; set; } = string.Empty;
        /// <summary>
        /// State of entries to request.
        /// Valid states are Unchanged, Add, Delete, and Update.
        /// </summary>
        public List<string> IncludeStates { get; set; } = default;
        /// <summary>
        /// Create parameters for requesting the chagned entries.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        public DiffEntriesOptions(Guid bucketId)
        {
            BucketId = bucketId;
        }
    }
}
