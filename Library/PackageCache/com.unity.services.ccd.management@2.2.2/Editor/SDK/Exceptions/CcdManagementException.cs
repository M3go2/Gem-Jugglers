using System;
using System.Collections.Generic;
using System.ComponentModel.Design.Serialization;
using Unity.Services.Ccd.Management.Http;
using Unity.Services.Core;
using UnityEditorInternal;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Represents an exception that occurs when communicating with the Unity CCD Management Service.
    /// </summary>
    public class CcdManagementException : RequestFailedException
    {
        /// <summary>
        /// Creates a CCDManagementException.
        /// </summary>
        /// <param name="reason">The error code or the HTTP Status returned by the service.</param>
        /// <param name="message">The description of the exception.</param>
        /// <param name="innerException">The exception raised by the service, if any.</param>
        public CcdManagementException(int reason, string message, Exception innerException) : base(reason, message, innerException) {}

        /// <summary>
        /// Creates a CCDManagementException.
        /// </summary>
        /// <param name="reason">The error code or the HTTP Status returned by the service.</param>
        /// <param name="message">The description of the exception.</param>
        public CcdManagementException(int reason, string message) : base(reason, message) {}

        /// <summary>
        /// Creates a CCDManagementException.
        /// </summary>
        /// <param name="innerException">The exception raised by the service, if any.</param>
        public CcdManagementException(Exception innerException) : base(CommonErrorCodes.Unknown, "Unknown CCD Management Service Exception", innerException) {}
    }

    public class CcdManagementValidationException : CcdManagementException
    {
        /// <summary>
        /// Details of validation error
        /// </summary>
        public List<object> Details;


        /// <summary>
        /// Creates a CCDManagementValidationException.
        /// </summary>
        /// <param name="reason">The error code or the HTTP Status returned by the service.</param>
        /// <param name="message">The description of the exception.</param>
        /// <param name="innerException">The exception raised by the service, if any.</param>
        public CcdManagementValidationException(int reason, string message, Exception innerException) : base(reason, message, innerException) {}

        /// <summary>
        /// Creates a CCDManagementValidationException
        /// </summary>
        /// <param name="reason">The error code or the HTTP Status returned by the service.</param>
        /// <param name="message">The description of the exception.</param>
        public CcdManagementValidationException(int reason, string message) : base(reason, message) {}

        /// <summary>
        /// Creates a CCDManagementValidationException
        /// </summary>
        /// <param name="reason">The error code or the HTTP Status returned by the service.</param>
        /// <param name="message">The description of the exception.</param>
        /// <param name="details">The details of the exception.</param>
        public CcdManagementValidationException(int reason, string message, List<object> details) : base(reason, message)
        {
            Details = details;
        }
    }
}
