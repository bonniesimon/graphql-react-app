import React from "react";
import { NavLink } from "react-router";

const Post = ({ post }) => {
  return (
    <article>
      <NavLink to={`/posts/${post.id}`}>
        <h2>{post.title}</h2>
      </NavLink>
      <p>Rating: {post.rating}</p>
    </article>
  );
};

export default Post;
