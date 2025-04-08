import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const Posts = () => {
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",

    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql`
        query ShowPost {
          post(id: 1) {
            title
            rating
          }
        }
      `,
    })
    .then((result) => console.log(result));

  return <div>Posts</div>;
};

export default Posts;
