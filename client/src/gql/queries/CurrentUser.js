import gql from "graphql-tag";

export default gql`
  {
    user {
      id
      email
      fullName
      userName
      books {
        id
        title
        author
        notes
        createdAt
        imageUrl
      }
    }
  }
`;
