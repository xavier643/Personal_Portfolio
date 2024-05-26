const userSchema = `
type Query {
  users: [User]
}

type Mutation {
  login(username: String!, password: String!): AuthPayload
  addUser(name: String!, email: String!, username: String!, password: String!): User
  refreshToken: AuthPayload
}

type AuthPayload {
  token: String
  expiresIn: Int
  user: User
}

type User {
  id: ID
  username: String
  name: String
  email: String
}
`;

module.exports = userSchema;
