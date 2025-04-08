import { useQuery } from "@apollo/client";
import postsQueries from "../../api/graphql/queries/posts";

const Posts = () => {
  const { loading, data } = useQuery(postsQueries.show(1));

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <article>
        <h2>{data.post.title}</h2>
        <p>Rating: {data.post.rating}</p>
      </article>
    </div>
  );
};

export default Posts;
