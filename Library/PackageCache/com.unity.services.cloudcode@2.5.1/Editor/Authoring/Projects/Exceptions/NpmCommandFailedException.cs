using System;
using System.Diagnostics;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects.Exceptions
{
    class NpmCommandFailedException : Exception
    {
        public ProcessStartInfo StartInfo { get; }
        public ProcessOutput ProcessOutput { get; }

        public NpmCommandFailedException(ProcessStartInfo startInfo, ProcessOutput processOutput) :
            base($"'{startInfo.Arguments}' command exited with {processOutput.ExitCode}{Format(processOutput)}")
        {
            StartInfo = startInfo;
            ProcessOutput = processOutput;
        }

        static string Format(ProcessOutput processOutput)
        {
            if (!string.IsNullOrWhiteSpace(processOutput.StdErr))
            {
                return $"\nSTDERR: {processOutput.StdErr}";
            }
            return string.Empty;
        }
    }
}
