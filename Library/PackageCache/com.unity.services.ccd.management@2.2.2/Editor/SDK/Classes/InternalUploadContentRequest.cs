using System;
using System.IO;
using Unity.Services.Ccd.Management.Content;

namespace Unity.Services.Ccd.Management
{
    internal class InternalUploadContentRequest
    {
        public Stream File { get; set; }
        public double ChunkSize { get; set; } = 5;
        public ProgressDelegate OnProgressed { get; set; } = null;
        public string Url { get; set; }

        public InternalUploadContentRequest(UploadContentOptions options, Configuration config)
        {
            var request = new UploadContentEnvRequest(
                CcdManagement.environmentid,
                options.BucketId.ToString(),
                options.EntryId.ToString(),
                CcdManagement.projectid, null);
            Url = request.ConstructUrl(config.BasePath);
            File = options.File;
            ChunkSize = options.ChunkSize;
            OnProgressed = options.OnProgressed;
        }
    }
}
