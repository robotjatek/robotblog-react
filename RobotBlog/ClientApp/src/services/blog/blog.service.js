import axios from 'axios';

class BlogService {
    loadBlogPosts = async () => {
        var result = await axios.get('api/blog/blogposts');
        return result.data;
    }

    loadBlogPost = async (id) => {
        var result = await axios.get(`/api/blog/blogpost/${id}`)
        return result.data;
    }
}

const blogService = new BlogService();
export default blogService;