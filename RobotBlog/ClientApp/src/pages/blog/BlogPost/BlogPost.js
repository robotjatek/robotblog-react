import React, { useState, useEffect, useCallback } from "reactn";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import blogService from "../../../services/blog/blog.service";
import NotAvailable from "../components/NotAvailable"
import Loading from "../../../components/loading/loading";
import Post from "../components/Post";

const BlogPost = () => {
    const { id } = useParams();
    const { i18n } = useTranslation();
    const [blogPost, setBlogPost] = useState();
    const [loading, setLoading] = useState(true);

    const [currentPost, setCurrentPost] = useState({ translated: null });

    const loadContent = useCallback(() => {
        setLoading(true);
        const lang = i18n.language;
        if (blogPost) {
            const translated = blogPost.translatedBlogPosts.filter(b => b.language === lang)[0];

            const currentPostData = {
                blogPostId: blogPost.blogPostId,
                date: blogPost.date,
                user: blogPost.user,
                translated: translated
            };
            setCurrentPost(currentPostData);
            setLoading(false);
        }
    }, [blogPost, i18n.language]);

    useEffect(() => {
        const loadBlogPost = async () => {
            const post = await blogService.loadBlogPost(id);
            setBlogPost(post);
        };

        loadBlogPost();
    }, [id]);

    useEffect(() => {
        loadContent();
    }, [i18n.language, blogPost, loadContent]);

    const placeHolder = loading ?
        <Loading /> :
        <NotAvailable />;

    return (
        <>
            {currentPost.translated ? <Post currentPost={currentPost} /> : placeHolder}
        </>
    )
}

export default BlogPost;