using System;
using System.Collections.Generic;
using Unity.Services.Ccd.Management.Http;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for managing entries or entry versions.
    /// </summary>
    public class EntryModelOptions
    {
        /// <summary>
        /// Content hash of the entry.
        /// </summary>
        public string ContentHash { get; set; }
        /// <summary>
        /// Content size of the entry.
        /// </summary>
        public int ContentSize { get; set; }
        /// <summary>
        /// Content type of the entry.
        /// </summary>
        public string ContentType { get; set; }
        /// <summary>
        /// Labels of the entry.
        /// </summary>
        public List<string> Labels { get; set; }
        /// <summary>
        /// Metadata of the entry.
        /// </summary>
        public JsonObject Metadata { get; set; }
        /// <summary>
        /// Path of the entry.
        /// </summary>
        public string Path { get; set; }
        /// <summary>
        /// Update the entry if it exists.
        /// </summary>
        public bool UpdateIfExists { get; set; }
        /// <summary>
        /// Create parameters for managing entries.
        /// </summary>
        /// <param name="path">Path of the entry.</param>
        /// <param name="contentHash">Content hash of the entry.</param>
        /// <param name="contentSize">Content size of the entry.</param>
        public EntryModelOptions(string path, string contentHash, int contentSize)
        {
            Path = path;
            ContentHash = contentHash;
            ContentSize = contentSize;
        }
    }
}
