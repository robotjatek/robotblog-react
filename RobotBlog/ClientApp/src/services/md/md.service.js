import axios from 'axios';
import MarkdownIt from 'markdown-it';

class MdService {
  loadSanitizedMd = async (path) => {
    const mdString = await this.__getMd(path);
    // looks like markdown-it will sanitize html by default
    const converter = new MarkdownIt({ html: false });
    const md = converter.render(mdString);
    return md;
  };

  __getMd = async (path) => {
    const result = await axios.get(path);
    return result.data;
  }
}

const mdService = new MdService();
export default mdService;
