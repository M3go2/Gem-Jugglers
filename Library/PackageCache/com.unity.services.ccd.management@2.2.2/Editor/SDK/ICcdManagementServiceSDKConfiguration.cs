using System.Threading.Tasks;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Interface used for editing the configuration of the CCD Management service SDK.
    /// Primary usage is for testing purposes.
    /// </summary>
    public interface ICcdManagementServiceSdkConfiguration
    {
        /// <summary>
        /// Sets the base path in configuration.
        /// </summary>
        /// <param name="basePath">The base path to set in configuration.</param>
        void SetBasePath(string basePath);

        /// <summary>
        /// Sets the http timeout in milliseconds
        /// </summary>
        /// <param name="timoutms">The number of milliseonds to wait before timing out.</param>
        void SetTimeout(int timoutms);
    }
}
