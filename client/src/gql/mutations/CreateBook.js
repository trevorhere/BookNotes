import gql from "graphql-tag";

export default gql`
  mutation addBook(
    $userID: ID
    $imageUrl: String
    $title: String
    $author: String
    $createdAt: String
    $infoLink: String
  ) {
    addBook(
      userID: $userID
      imageUrl: $imageUrl
      title: $title
      author: $author
      createdAt: $createdAt
      infoLink: $infoLink
    ) {
      id
      title
      author
      infoLink
    }
  }
`;
