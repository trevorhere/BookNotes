import gql from "graphql-tag";

export default gql`
  mutation deleteBook($bookID: ID) {
    deleteBook(bookID: $bookID) {
      id
    }
  }
`;
