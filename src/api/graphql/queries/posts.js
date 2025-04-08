import { gql } from "@apollo/client";

const show = (id) => gql`
  query ShowPost {
    post(id: ${id}) {
      title
      rating
    }
  }
`;

const list = () => gql`
  query ListPost {
    posts {
      title
      rating
    }
  }
`;

const postsQueries = {
  list,
  show,
};

export default postsQueries;
