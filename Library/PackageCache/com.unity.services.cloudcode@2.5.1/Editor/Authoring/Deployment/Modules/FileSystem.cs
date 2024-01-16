#nullable enable
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.IO;
using Unity.Services.CloudCode.Authoring.Editor.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment.Modules
{
    class FileSystem : IFileSystem
    {
        public Task<string> ReadAllText(string path, CancellationToken token = default(CancellationToken))
        {
            return Task.FromResult(File.ReadAllText(path, Encoding.Default));
        }

        public Task WriteAllText(string path, string contents, CancellationToken token = default(CancellationToken))
        {
            File.WriteAllText(path, contents, Encoding.Default);
            return Task.CompletedTask;
        }

        public Task Delete(string path, CancellationToken token = default(CancellationToken))
        {
            File.Delete(path);
            return Task.CompletedTask;
        }

        public Task Copy(string sourceFileName, string destFileName, bool overwrite, CancellationToken token = default(CancellationToken))
        {
            File.Copy(sourceFileName, destFileName, true);
            return Task.CompletedTask;
        }

        public IFileStream CreateFile(string path)
        {
            return new CloudCodeFileStream(File.Create(path));
        }

        public Task<DirectoryInfo> CreateDirectory(string path)
        {
            return Task.FromResult(Directory.CreateDirectory(path));
        }

        public void CreateZipFromDirectory(string sourceDirectoryName, string destinationArchiveFileName)
        {
            ZipFile.CreateFromDirectory(sourceDirectoryName, destinationArchiveFileName);
        }

        public Task DeleteDirectory(string path, bool recursive)
        {
            Directory.Delete(path);
            return Task.CompletedTask;
        }

        public bool FileExists(string path)
        {
            return File.Exists(path);
        }

        public void FileMove(string sourceFileName, string destFileName)
        {
            File.Move(sourceFileName, destFileName);
        }

        public bool DirectoryExists(string path)
        {
            return Directory.Exists(path);
        }

        public string[] DirectoryGetFiles(string path, string searchPattern, SearchOption searchOption)
        {
            return Directory.GetFiles(path, searchPattern, searchOption);
        }

        public DirectoryInfo? DirectoryGetParent(string path)
        {
            return Directory.GetParent(path);
        }

        public string[] DirectoryGetFiles(string path, string searchPattern)
        {
            return Directory.GetFiles(path, searchPattern);
        }

        public string? GetDirectoryName(string path)
        {
            return Path.GetDirectoryName(path);
        }

        public string GetFullPath(string path)
        {
            return Path.GetFullPath(path);
        }

        public string GetFileNameWithoutExtension(string path)
        {
            return Path.GetFileNameWithoutExtension(path);
        }

        public string Combine(params string[] paths)
        {
            return Path.Combine(paths);
        }

        public string Join(string path1, string path2)
        {
            return Path.Join(path1, path2);
        }

        public string ChangeExtension(string path, string extension)
        {
            return Path.ChangeExtension(path, extension);
        }
    }
}
