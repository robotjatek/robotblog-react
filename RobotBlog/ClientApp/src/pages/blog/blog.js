import React from 'react';
import uuid from 'react-uuid';
import { useEffect, useState } from 'reactn';
import { useTranslation } from 'react-i18next';
import blogService from '../../services/blog/blog.service';
import Post from './components/Post';
import './blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadBlogPosts = async () => {
      setPosts(await blogService.loadBlogPosts());
    };

    loadBlogPosts();
  }, []);

  return (
    (
      <div>
        {posts.map((post) => {
          const translations = post.translatedBlogPosts;
          // eslint-disable-next-line
          // TODO: filter on server side? or do not filter at all => show empty post with "This content is not available in this language?"
          const currentBlogs = translations.filter((item) => item.language === i18n.language);
          return currentBlogs.map((translated) => {
            const current = {
              blogPostId: post.blogPostId,
              date: post.date,
              user: post.user,
              translated,
            };

            return <Post currentPost={current} key={uuid()} />;
          });
        })}
      </div>
    )
  );
};

export default Blog;
