using System;
using System.IO;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for uploading content.
    /// </summary>
    public class UploadContentOptions
    {
        /// <summary>
        /// Id of bucket to upload.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Id of the entry to upload.
        /// </summary>
        public Guid EntryId { get; set; }
        /// <summary>
        /// Stream of the file to be uploaded.
        /// </summary>
        public Stream File { get; set; }
        /// <summary>
        /// Size to chunk file in MB. Default is 5MB.
        /// </summary>
        public double ChunkSize { get; set; } = 5;
        /// <summary>
        /// Progress delegate to run on progress.
        /// </summary>
        public ProgressDelegate OnProgressed { get; set; } = null;
        /// <summary>
        /// Create parameters for uploading content.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="entryId">Id of the entry.</param>
        /// <param name="file">Stream of the file.</param>
        public UploadContentOptions(Guid bucketId, Guid entryId, Stream file)
        {
            BucketId = bucketId;
            EntryId = entryId;
            File = file;
        }
    }
}
