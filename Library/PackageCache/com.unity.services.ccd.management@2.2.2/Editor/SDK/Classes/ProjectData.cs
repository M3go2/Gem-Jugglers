using System;
using System.Collections.Generic;
using UnityEngine;

namespace Unity.Services.Ccd.Management
{
    [Serializable]
    internal class ProjectData
    {
        [SerializeField]
        internal string id;
        [SerializeField]
        internal string genesisId;
        [SerializeField]
        internal string organizationId;
        [SerializeField]
        internal string organizationGenesisId;
        [SerializeField]
        internal string name;
        [SerializeField]
        internal string coppa;
        [SerializeField]
        internal bool kidsStoreCompliance;
        [SerializeField]
        internal string createdAt;
        [SerializeField]
        internal string updatedAt;
        [SerializeField]
        internal string archivedAt;
        [SerializeField]
        internal string defaultEnvironmentId;
        [SerializeField]
        internal string iconUrl;
        [SerializeField]
        internal List<string> _roles;

        internal static ProjectData ParseProjectData(string data)
        {
            var projectData = JsonUtility.FromJson<ProjectData>(data);
            if (projectData.id == null)
            {
                throw new ArgumentException("Unable to parse project data.");
            }
            return projectData;
        }
    }
}
