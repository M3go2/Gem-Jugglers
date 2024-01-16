using System;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for pagination of a request that has multiple results.
    /// </summary>
    public class PageOptions
    {
        /// <summary>
        /// The current page to retrieve.
        /// Minimum: 1.
        /// </summary>
        public int Page { get; set; } = 1;
        /// <summary>
        /// The number of items to retrieve.
        /// Minimum: 1. Maximum: 100.
        /// </summary>
        public int PerPage { get; set; } = 10;
    }
}
