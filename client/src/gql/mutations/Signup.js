import gql from "graphql-tag";

export default gql`
  mutation Signup(
    $email: String
    $password: String
    $fullName: String
    $userName: String
  ) {
    signup(
      email: $email
      password: $password
      fullName: $fullName
      userName: $userName
    ) {
      id
      email
      userName
    }
  }
`;
