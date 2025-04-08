import React from "react";

const Post = ({ post }) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>Rating: {post.rating}</p>
    </article>
  );
};

export default Post;
