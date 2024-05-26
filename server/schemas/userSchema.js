const userSchema = `
type Query {
  users(limit: Int, skip: Int): [User]
}

type Mutation {
  login(username: String!, password: String!): AuthPayload
  addUser(name: String!, email: String!, username: String!, password: String!, role: String): User
  updateUser(id: ID!, name: String, email: String, username: String, password: String, role: String): User
  deleteUser(id: ID!): Boolean
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
  role: String
  createdAt: String
  updatedAt: String
}
`;

module.exports = userSchema;
