using System.Collections.Generic;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    class ProblemJson
    {
        public string Type { get; set; }
        public string Title { get; set; }
        public int Status { get; set; }
        public string Detail { get; set; }
        public int Code { get; set; }
        public IList<ProblemJsonError> Errors { get; set; }
    }

    class ProblemJsonError
    {
        public string Field { get; set; }
        public IList<string> Messages { get; set; }
    }
}
