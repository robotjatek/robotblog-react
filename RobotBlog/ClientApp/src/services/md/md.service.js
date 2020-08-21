import Axios from "axios";
import MarkdownIt from "markdown-it";

class MdService {
    loadSanitizedMd = async (path) => {
        const mdString = await this.__getMd(path);
        const converter = new MarkdownIt({ html: false }); // looks like markdown-it will sanitize html by default
        const md = converter.render(mdString);
        return md;
    };

    __getMd = async (path) => {
        const result = await Axios.get(path);
        return result.data;
    }
}

const mdService = new MdService();
export default mdService;
