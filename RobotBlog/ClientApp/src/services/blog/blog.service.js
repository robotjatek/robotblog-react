import apiService from '../api/api.service';

class BlogService {
  loadBlogPosts = async () => {
    const result = await apiService.get('api/blog/blogposts');
    return result.data;
  }

  loadBlogPost = async (id) => {
    const result = await apiService.get(`/api/blog/blogpost/${id}`);
    return result.data;
  }
}

const blogService = new BlogService();
export default blogService;
