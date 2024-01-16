using System;
using System.Runtime.Serialization;
using UnityEngine.Scripting;

namespace Unity.Services.CloudCode.Subscriptions
{
    ///<inheritdoc cref="IMessageReceivedEvent"/>
    [Preserve]
    [DataContract]
    class MessageReceivedEvent : IMessageReceivedEvent
    {
        /// <summary>
        /// The message received, base64 encoded. The maximum size of the message payload is 10 kilobytes.
        /// </summary>
        [DataMember(Name = "data_base64", IsRequired = true, EmitDefaultValue = true)]
        internal string data_base64;

        [Preserve][DataMember(Name = "time", IsRequired = true, EmitDefaultValue = true)]
        internal string time;

        [Preserve][DataMember(Name = "message", IsRequired = false, EmitDefaultValue = true)]
        public string Message { get; private set; }

        public DateTime Time { get; private set; }

        [Preserve][DataMember(Name = "specversion", IsRequired = true, EmitDefaultValue = true)]
        public string SpecVersion { get; private set; }

        [Preserve][DataMember(Name = "id", IsRequired = true, EmitDefaultValue = true)]
        public string Id { get; private set; }

        [Preserve][DataMember(Name = "source", IsRequired = true, EmitDefaultValue = true)]
        public string Source { get; private set; }

        [Preserve][DataMember(Name = "type", IsRequired = true, EmitDefaultValue = true)]
        public string Type { get; private set; }

        [Preserve][DataMember(Name = "projectid", IsRequired = true, EmitDefaultValue = true)]
        public string ProjectId { get; private set; }

        [Preserve][DataMember(Name = "environmentid", IsRequired = true, EmitDefaultValue = true)]
        public string EnvironmentId { get; private set; }

        [Preserve][DataMember(Name = "correlationid", IsRequired = false, EmitDefaultValue = true)]
        public string CorrelationId { get; private set; }

        [Preserve][DataMember(Name = "messagetype", IsRequired = false, EmitDefaultValue = true)]
        public string MessageType { get; private set; }

        [OnDeserialized]
        internal void OnDeserialized(StreamingContext context)
        {
            Message = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(data_base64));
            Time = DateTime.Parse(time);
        }
    }
}
