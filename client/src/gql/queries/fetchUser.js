import gql from "graphql-tag";

export default gql`
  query UserID($userID: ID) {
    userID(userID: $userID) {
      id
      userName
      email
      fullName
      books {
        title
        author
        notes
      }
    }
  }
`;
