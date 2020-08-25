import React from "reactn";
import { Link } from "react-router-dom";

const Post = ({ currentPost }) => {
    const date = new Date(currentPost.date);

    const getDate = () => {
        const correctDate = (date) => {
            return ('' + date).length === 1 ? '0' + date : date;
        };

        const year = date.getFullYear();
        const month = correctDate(date.getMonth() + 1);
        const day = correctDate(date.getDay());
        const hour = date.getHours();
        const minute = date.getMinutes();

        return `${year}/${month}/${day} ${hour}:${minute}`;
    }

    return (
        <>
            <div className="blogTitle">
                <h1><Link to={`/blog/${currentPost.blogPostId}`}>{currentPost.translated.title}</Link></h1>
            </div>
            <p>{currentPost.user.username} | {getDate()}</p>
            <hr />
            <p>{currentPost.translated.content}</p>
            <hr />
        </>);
};

export default Post;