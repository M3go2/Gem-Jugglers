using System;
using System.Collections.Generic;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for retrieving the diff between two releases. Either FromReleaseId or FromReleaseNum and ToReleaseId or ToReleaseNum should be specified.
    /// </summary>
    public class ReleaseDiffOptions
    {
        /// <summary>
        /// Id of the bucket of the release.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// The Id of the release to start from.
        /// </summary>
        public Guid FromReleaseId { get; set; }
        /// <summary>
        /// The release number to start from.
        /// </summary>
        public int? FromReleaseNum { get; set; }
        /// <summary>
        /// The Id of the release to end at.
        /// </summary>
        public Guid ToReleaseId { get; set; }
        /// <summary>
        /// The release number to end at.
        /// </summary>
        public int? ToReleaseNum { get; set; }
        /// <summary>
        /// The path to filter to.
        /// </summary>
        public string Path { get; set; } = string.Empty;
        /// <summary>
        /// The states of entries to include.
        /// </summary>
        public List<string> Include_States { get; set; } = default;
        /// <summary>
        /// Create parameters for retrieving diff.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="fromReleaseId">Id of the release to start from.</param>
        /// <param name="toReleaseId">Id of the release to end at.</param>
        public ReleaseDiffOptions(Guid bucketId, Guid fromReleaseId, Guid toReleaseId)
        {
            BucketId = bucketId;
            FromReleaseId = fromReleaseId;
            ToReleaseId = toReleaseId;
        }

        /// <summary>
        /// Create parameters for retrieving diff.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="fromReleaseNum">Release number to start from.</param>
        /// <param name="toReleaseNum">Release number to end at.</param>
        public ReleaseDiffOptions(Guid bucketId, int fromReleaseNum, int toReleaseNum)
        {
            BucketId = bucketId;
            FromReleaseNum = fromReleaseNum;
            ToReleaseNum = toReleaseNum;
        }
    }
}
