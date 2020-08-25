import axios from 'axios';

class BlogService {
  loadBlogPosts = async () => {
    const result = await axios.get('api/blog/blogposts');
    return result.data;
  }

  loadBlogPost = async (id) => {
    const result = await axios.get(`/api/blog/blogpost/${id}`);
    return result.data;
  }
}

const blogService = new BlogService();
export default blogService;
