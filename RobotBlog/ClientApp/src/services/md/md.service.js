import MarkdownIt from 'markdown-it';
import apiService from '../api/api.service';

class MdService {
  loadSanitizedMd = async (path) => {
    const mdString = await this.__getMd(path);
    const md = this.createMdFromString(mdString);
    return md;
  };

  createMdFromString = (mdString) => {
    // looks like markdown-it will sanitize html by default
    const converter = new MarkdownIt({ html: false, breaks: true });
    const md = converter.render(mdString);
    return md;
  }

  __getMd = async (path) => {
    const result = await apiService.get(path);
    return result.data;
  }
}

const mdService = new MdService();
export default mdService;
