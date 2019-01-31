import gql from "graphql-tag";

export default gql`
  mutation addBook(
    $userID: ID
    $imageUrl: String
    $title: String
    $author: String
    $createdAt: String
  ) {
    addBook(
      userID: $userID
      imageUrl: $imageUrl
      title: $title
      author: $author
      createdAt: $createdAt
    ) {
      id
      title
      author
    }
  }
`;
