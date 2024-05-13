const userSchema = `
type Query {
  users: [User]
}

type Mutation {
  login(username: String!, password: String!): AuthPayload
  addUser(name: String!, email: String!, username: String!, password: String!): User
}

type AuthPayload {
  token: String
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
