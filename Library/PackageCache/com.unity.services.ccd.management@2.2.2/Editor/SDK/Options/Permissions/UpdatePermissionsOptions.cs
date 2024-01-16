using System;
using static Unity.Services.Ccd.Management.Models.CcdPermissionUpdate;

namespace Unity.Services.Ccd.Management
{
    /// <summary>
    /// Parameters for managing a permission.
    /// </summary>
    public class UpdatePermissionsOption
    {
        /// <summary>
        /// Id of bucket to manage permission.
        /// </summary>
        public Guid BucketId { get; set; }
        /// <summary>
        /// Permission action to manage.
        /// </summary>
        public ActionOptions Action { get; set; }
        /// <summary>
        /// Permission to manage.
        /// </summary>
        public PermissionOptions Permission { get; set; }
        /// <summary>
        /// Create parameters for managing a permission.
        /// </summary>
        /// <param name="bucketId">Id of the bucket.</param>
        /// <param name="action">Action.</param>
        /// <param name="permission">Permission.</param>
        public UpdatePermissionsOption(Guid bucketId, ActionOptions action, PermissionOptions permission)
        {
            BucketId = bucketId;
            Action = action;
            Permission = permission;
        }
    }
}
