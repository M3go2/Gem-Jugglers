using Unity.Services.Core;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// The known errors caused when communicating with the CCD Management Service.
    /// </summary>
    public static class CcdManagementErrorCodes
    {
        /// <summary>
        /// Returned when an argument is invalid.
        /// </summary>
        public const int InvalidArgument = 19001;
        /// <summary>
        /// Returned when the range requested is unsatisfiable.
        /// </summary>
        public const int OutOfRange = 19002;
        /// <summary>
        /// Returned  when the request is unauthorized.
        /// </summary>
        public const int Unauthorized = 19003;
        /// <summary>
        /// Returned when the entity requested already exists.
        /// </summary>
        public const int AlreadyExists = 19006;
        /// <summary>
        /// Returned when there is an internal server error processing the request.
        /// </summary>
        public const int InternalError = 19008;
        /// <summary>
        /// Returned when the organization is not activated.
        /// </summary>
        public const int InactiveOrganization = 19010;
        /// <summary>
        /// Returned when the entry hash does not match the expected hash.
        /// </summary>
        public const int InvalidHashMismatch = 19011;
    }
}
