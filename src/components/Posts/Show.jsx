import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import postsQueries from "../../api/graphql/queries/posts";

const Show = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(postsQueries.show(id));

  if (loading) {
    return (
      <main>
        <progress />
      </main>
    );
  }

  return (
    <main>
      <h2>{data.post.title}</h2>
      <p>Rating: {data.post.rating}</p>
      <details name="comments" open>
        <summary>Comments</summary>
        {data.post.comments.map((comment) => (
          <article>{comment.body}</article>
        ))}
      </details>
    </main>
  );
};

export default Show;
