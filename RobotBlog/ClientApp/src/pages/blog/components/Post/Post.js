import React from 'reactn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import mdService from '../../../../services/md/md.service';

const Post = ({ currentPost }) => {
  const date = new Date(currentPost.date);
  const mdContent = mdService.createMdFromString(currentPost.translated.content);

  const getDate = () => {
    const correctDate = (toCorrect) => {
      const result = `${toCorrect}`.length === 1 ? `0${toCorrect}` : toCorrect;
      return result;
    };

    const year = date.getFullYear();
    const month = correctDate(date.getMonth() + 1);
    const day = correctDate(date.getDay());
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  return (
    (
      <>
        <div className="blogTitle">
          <h1><Link to={`/blog/${currentPost.blogPostId}`}>{currentPost.translated.title}</Link></h1>
        </div>
        <p>
          {`${currentPost.user.username} | ${getDate()}`}
        </p>
        <hr />
        {/* eslint-disable react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: mdContent }} />
        <hr />
      </>
    )
  );
};

Post.propTypes = {
  currentPost: PropTypes.shape({
    date: PropTypes.string.isRequired,
    blogPostId: PropTypes.number.isRequired,
    translated: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Post;
