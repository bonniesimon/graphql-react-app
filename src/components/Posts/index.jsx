import { useQuery } from "@apollo/client";
import postsQueries from "../../api/graphql/queries/posts";
import Post from "./Post";

const Posts = () => {
  const { loading, data } = useQuery(postsQueries.list());

  if (loading) return <progress />;

  return (
    <div>
      {data.posts.map((post) => (
        <Post key={post.rating} post={post} />
      ))}
    </div>
  );
};

export default Posts;
