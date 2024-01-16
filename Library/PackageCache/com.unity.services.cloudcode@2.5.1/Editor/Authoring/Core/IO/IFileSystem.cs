#nullable enable
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.IO
{
    interface IFileSystem
    {
        Task<string> ReadAllText(string path, CancellationToken token = default(CancellationToken));
        Task WriteAllText(string path, string contents, CancellationToken token = default(CancellationToken));
        Task Delete(string path, CancellationToken token = default(CancellationToken));
        Task Copy(
            string sourceFileName,
            string destFileName,
            bool overwrite,
            CancellationToken token = default(CancellationToken));
        IFileStream CreateFile(string path);
        Task<DirectoryInfo> CreateDirectory(string path);
        void CreateZipFromDirectory(string sourceDirectoryName, string destinationArchiveFileName);
        Task DeleteDirectory(string path, bool recursive);
        bool FileExists(string path);
        bool DirectoryExists(string path);
        string? GetDirectoryName(string path);
        string GetFullPath(string path);
        string GetFileNameWithoutExtension(string path);
        string Combine(params string[] paths);
        string Join(string path1, string path2);
        string ChangeExtension(string path, string extension);
        string[] DirectoryGetFiles(string path, string searchPattern);
        string[] DirectoryGetFiles(string path, string searchPattern, SearchOption searchOption);
        DirectoryInfo? DirectoryGetParent(string path);
        void FileMove(string sourceFileName, string destFileName);
    }
}
