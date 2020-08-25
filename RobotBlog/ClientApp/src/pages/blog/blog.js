import React from 'react'
import { useEffect, useState } from 'reactn';
import blogService from '../../services/blog/blog.service';
import Post from "./components/Post"
import { useTranslation } from 'react-i18next';
import "./blog.css"

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        const loadBlogPosts = async () => {
            const posts = await blogService.loadBlogPosts();
            setPosts(posts);
        };

        loadBlogPosts();
    }, []);


    return (<div>
        {posts.map((post, i) => {
            const translations = post.translatedBlogPosts;
            const currentBlogs = translations.filter(item => item.language === i18n.language); //TODO: filter on server side? or do not filter at all => show empty post with "This content is not available in this language?"
            return currentBlogs.map((translated, j) => {
                const current = {
                    blogPostId: post.blogPostId,
                    date: post.date,
                    user: post.user,
                    translated: translated
                };

                return <Post currentPost={current} key={i} />
            });
        })}
    </div>)
}

export default Blog;