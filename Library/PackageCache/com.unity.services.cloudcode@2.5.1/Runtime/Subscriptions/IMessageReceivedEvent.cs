using System;

namespace Unity.Services.CloudCode.Subscriptions
{
    /// <summary>
    /// Event triggered when a message is received from Cloud Code.
    /// </summary>
    public interface IMessageReceivedEvent
    {
        /// <summary>
        /// Getter for the spec version of the received message's envelope.
        /// </summary>
        /// <returns>The spec version.</returns>
        string SpecVersion { get; }

        /// <summary>
        /// Getter for the id of the received message's envelope.
        /// </summary>
        /// <returns>The id.</returns>
        string Id { get; }

        /// <summary>
        /// Getter for the source of the message's envelope.
        /// </summary>
        /// <returns>The source.</returns>
        string Source { get; }

        /// <summary>
        /// Getter for the type of the message's envelope.
        /// </summary>
        /// <returns>The source.</returns>
        string Type { get; }

        /// <summary>
        /// Getter for the time when the message was created.
        /// </summary>
        /// <returns>The date and time.</returns>
        DateTime Time { get; }

        /// <summary>
        /// Getter for the project id that the message is for.
        /// </summary>
        /// <returns>The project id.</returns>
        string ProjectId { get; }

        /// <summary>
        /// Getter for the environment id that the message is for.
        /// </summary>
        /// <returns>The environment id.</returns>
        string EnvironmentId { get; }

        /// <summary>
        /// Getter for the correlation id that the message is for.
        /// </summary>
        /// <returns>The correlation id.</returns>
        string CorrelationId { get; }

        /// <summary>
        /// Getter for the message that was sent from Cloud Code for the player.
        /// </summary>
        /// <returns>The received message.</returns>
        string Message { get; }

        /// <summary>
        /// Getter for the type of message that was received.
        /// </summary>
        /// <returns>The type of message that was received.</returns>
        string MessageType { get; }
    }
}
