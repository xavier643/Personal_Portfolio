import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
mutation AddNewUser($username: String!, $email: String!, $name: String!, $password: String!, $role: String) {
  addUser(username: $username, email: $email, name: $name, password: $password, role: $role) {
    id
    username
    email
  }
}
`