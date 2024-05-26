import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetAllUsers($limit: Int, $skip: Int) {
    users(limit: $limit, skip: $skip) {
      id
      username
      email
    }
  }
`;
