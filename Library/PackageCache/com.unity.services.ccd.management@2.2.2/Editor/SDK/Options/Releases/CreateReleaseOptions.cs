using System;
using System.Collections.Generic;
using Unity.Services.Ccd.Management.Http;
using Unity.Services.Ccd.Management.Models;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for creating a release.
    /// </summary>
    public class CreateReleaseOptions
    {
        /// <summary>
        /// Id of the bucket to release.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// List of entries to create a release for. If left empty, all entries will be included.
        /// </summary>
        public List<CcdReleaseEntryCreate> Entries { get; set; } = new List<CcdReleaseEntryCreate>();
        /// <summary>
        /// Metadata of the release.
        /// </summary>
        public JsonObject Metadata { get; set; }
        /// <summary>
        /// Notes of the release.
        /// </summary>
        public string Notes { get; set; } = string.Empty;
        /// <summary>
        /// Snapshot of the release.
        /// </summary>
        public DateTime Snapshot { get; set; }
        /// <summary>
        /// Create parameters for creating a release.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        public CreateReleaseOptions(Guid bucketId)
        {
            BucketId = bucketId;
        }
    }
}
