import gql from "graphql-tag";

export default gql`
  mutation updateBook(
    $bookID: ID
    $imageUrl: String
    $title: String
    $author: String
    $notes: String
  ) {
    updateBook(
      bookID: $bookID
      imageUrl: $imageUrl
      title: $title
      author: $author
      notes: $notes
    ) {
      id
      title
      author
      notes
    }
  }
`;
