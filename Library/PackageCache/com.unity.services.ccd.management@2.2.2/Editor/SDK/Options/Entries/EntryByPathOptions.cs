using System;
namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for entry by path options.
    /// </summary>
    public class EntryByPathOptions
    {
        /// <summary>
        /// Id of bucket to manage entry.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Path of the entry.
        /// </summary>
        public string Path { get; set; } = string.Empty;
        /// <summary>
        /// Id of the version of the entry.
        /// </summary>
        public Guid VersionId { get; set; }
        /// <summary>
        /// Create parameters for entry by path options.
        /// </summary>
        /// <param name="bucketId">Id of the entry</param>
        /// <param name="path">Path of the entry</param>
        public EntryByPathOptions(Guid bucketId, string path)
        {
            BucketId = bucketId;
            Path = path;
        }
    }
}
