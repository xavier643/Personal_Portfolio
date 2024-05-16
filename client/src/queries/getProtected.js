import { gql } from "@apollo/client";

export const GET_PROTECTED = gql`
query GetProtectedData {
  protectedData {
    message
    token
  }
}
`