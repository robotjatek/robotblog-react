import React from 'react';
import uuid from 'react-uuid';
import { useEffect, useState } from 'reactn';
import { useTranslation } from 'react-i18next';
import blogService from '../../services/blog/blog.service';
import Post from './components/Post';
import './blog.css';
import Loading from '../../components/loading/loading';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      setPosts(await blogService.loadBlogPosts());
      setLoading(false);
    };

    loadBlogPosts();
  }, []);

  const PostList = () => {
    const components = posts.map((post) => {
      const translations = post.translatedBlogPosts;
      // eslint-disable-next-line
      // TODO: filter on server side? or do not filter at all => show empty post with "This content is not available in this language?"
      const currentBlogs = translations.filter((item) => item.language === i18n.language);
      return currentBlogs.map((translated) => {
        const firstParagraphTranslated = {
          ...translated,
          content: translated.content.split(/\r?\n/)[0],
        };

        const current = {
          blogPostId: post.blogPostId,
          date: post.date,
          user: post.user,
          translated: firstParagraphTranslated,
        };

        return <Post currentPost={current} key={uuid()} />;
      });
    });
    return (components);
  };

  const toDisplay = loading ? <Loading /> : <PostList />;

  return (
    (
      <div>
        {toDisplay}
      </div>
    )
  );
};

export default Blog;
