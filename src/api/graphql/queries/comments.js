import { gql } from "@apollo/client";

const create = () => gql`
  mutation CommentCreate($body: String!, $postId: ID!) {
    commentCreate(input: { body: $body, postId: $postId }) {
      comment {
        id
        body
      }
    }
  }
`;

const commentsQueries = {
  create,
};

export default commentsQueries;
