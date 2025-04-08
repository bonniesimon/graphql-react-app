import { gql } from "@apollo/client";

const show = (id) => gql`
  query ShowPost {
    post(id: ${id}) {
      title
      rating
    }
  }
`;

const postsQueries = {
  show,
};

export default postsQueries;
