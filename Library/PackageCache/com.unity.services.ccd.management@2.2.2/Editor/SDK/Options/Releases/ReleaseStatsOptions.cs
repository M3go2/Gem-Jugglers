using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for retrieving release stats.
    /// </summary>
    public class ReleaseStatsOptions
    {
        /// <summary>
        /// Id of the bucket of the release.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Id of the release.
        /// </summary>
        public Guid ReleaseId { get; set; }
        /// <summary>
        /// Metric to gather for release.
        /// </summary>
        public CcdMetric Metric { get; set; }
        /// <summary>
        /// Timespan interval to gather for release.
        /// </summary>
        public CcdInterval Interval { get; set; }
        /// <summary>
        /// Create parameters for retrieving release stats.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="releaseId">Id of the release.</param>
        /// <param name="metric">Metric to gather.</param>
        /// <param name="interval">Timespan interval.</param>
        public ReleaseStatsOptions(Guid bucketId, Guid releaseId, CcdMetric metric, CcdInterval interval)
        {
            BucketId = bucketId;
            ReleaseId = releaseId;
            Metric = metric;
            Interval = interval;
        }

        /// <summary>
        /// Statistic metric to measure.
        /// </summary>
        public enum CcdMetric
        {
            /// <summary>
            /// Number of downloads.
            /// </summary>
            Downloads = 1,
            /// <summary>
            /// Number of errors.
            /// </summary>
            Errors = 2
        }

        /// <summary>
        /// Interval of statistic metric. Day = Last 24 hours. Week = Last 7 days. Month = Last 30 days.
        /// </summary>
        public enum CcdInterval
        {
            /// <summary>
            /// Last 24 hours.
            /// </summary>
            Day = 1,
            /// <summary>
            /// Last 7 days.
            /// </summary>
            Week = 2,
            /// <summary>
            /// Last 30 days.
            /// </summary>
            Month = 3
        }
    }
}
