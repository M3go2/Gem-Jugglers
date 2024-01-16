using System.IO;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.IO
{
    class CloudCodeFileStream : IFileStream
    {
        internal FileStream FileStream;

        public CloudCodeFileStream(FileStream fileStream)
        {
            FileStream = fileStream;
        }

        public void Close()
        {
            FileStream.Close();
        }
    }
}
