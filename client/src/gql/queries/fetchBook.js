import gql from "graphql-tag";

export default gql`
  query book($bookID: ID) {
    book(bookID: $bookID) {
      id
      title
      author
      imageUrl
      createdAt
      notes
      infoLink
    }
  }
`;
