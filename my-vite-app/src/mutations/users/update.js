import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String, $username: String, $password: String, $role: String) {
    updateUser(id: $id, name: $name, email: $email, username: $username, password: $password, role: $role) {
      id
      username
      email
      role
      createdAt
      updatedAt
    }
  }
`