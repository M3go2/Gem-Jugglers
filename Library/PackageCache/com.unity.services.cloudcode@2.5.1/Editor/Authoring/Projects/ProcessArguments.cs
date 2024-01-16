using System.Collections.Generic;
using System.Linq;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    static class ProcessArguments
    {
        const string k_Separator = " ";
        const char k_Quote = '"';
        const string k_EscapedQuote = "\\\"";
        static readonly IList<char> k_SpecialCharacters = new List<char>
        {
            ' ',
            '\n',
            '\t',
            '\v',
            k_Quote
        };

        public static string Join(IEnumerable<string> arguments)
        {
            return string.Join(k_Separator, arguments.Select(Escape));
        }

        static string Escape(string argument)
        {
            if (k_SpecialCharacters.Any(s => argument.IndexOf(s) != -1))
            {
                return $"{k_Quote}{argument.Replace(k_Quote.ToString(), k_EscapedQuote)}{k_Quote}";
            }

            return argument;
        }
    }
}
