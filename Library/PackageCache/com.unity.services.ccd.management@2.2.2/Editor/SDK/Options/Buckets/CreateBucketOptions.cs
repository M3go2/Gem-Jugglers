using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for creating a bucket.
    /// </summary>
    public class CreateBucketOptions
    {
        /// <summary>
        /// Name of bucket to create.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Description of bucket to create.
        /// </summary>
        public string Description { get; set; } = string.Empty;
        /// <summary>
        /// Create parameters for creating a bucket.
        /// </summary>
        /// <param name="name">Name of the bucket.</param>
        public CreateBucketOptions(string name)
        {
            Name = name;
        }
    }
}
