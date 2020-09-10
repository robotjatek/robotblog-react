using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;

using RazorLight;

namespace RobotBlog.Services.Mail
{
    public class EmailTranslator
    {
        public async Task<ICollection<KeyValuePair<string, object>>> Translate(RazorLightEngine templateEngine, Dictionary<string, string> translations, object model, string languageHint, string type)
        {
            var renderData = (ICollection<KeyValuePair<string, object>>)new ExpandoObject();
            foreach (var item in translations)
            {
                var cacheKey = $"{item.Key}-{languageHint}-{type}";
                var toAdd = new KeyValuePair<string, object>(item.Key, await templateEngine.CompileRenderStringAsync(cacheKey, item.Value, model));
                renderData.Add(toAdd);
            }

            return renderData;
        }
    }
}
