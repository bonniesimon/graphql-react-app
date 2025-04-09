import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import commentsQueries from "../../api/graphql/queries/comments";
import { useParams, useNavigate } from "react-router";
import postsQueries from "../../api/graphql/queries/posts";

const New = () => {
  const [body, setBody] = useState("");

  const { id: postId } = useParams();
  const [addTodo, { loading, error }] = useMutation(commentsQueries.create());
  const navigate = useNavigate();

  const handleSuccess = () => navigate(`/posts/${postId}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo({
      variables: { body, postId },
      onCompleted: handleSuccess,
      refetchQueries: [{ query: postsQueries.show(postId) }],
    });
  };

  if (loading) return <progress />;

  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Text"
          aria-label="Text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Save Comment</button>
      </form>
    </div>
  );
};

export default New;
