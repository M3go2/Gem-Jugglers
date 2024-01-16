using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Model
{
    enum ParameterType
    {
        String,
        Numeric,
        Boolean,
        JSON,
        Any
    }

    [Serializable]
    class CloudCodeParameter
    {
        public string Name;
        public ParameterType ParameterType;
        public bool Required;

        bool Equals(CloudCodeParameter other)
        {
            return Name == other.Name
                && ParameterType == other.ParameterType
                && Required == other.Required;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((CloudCodeParameter)obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Name, (int)ParameterType, Required);
        }
    }
}
