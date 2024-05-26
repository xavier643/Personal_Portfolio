const { mergeTypeDefs } = require('@graphql-tools/merge');
const userSchema = require('./userSchema');

const helloSchema = `
  type Query {
    hello: String
    protectedData: ProtectedData
  }

  type ProtectedData {
    message: String
    token: String
    expiresIn: Int
  }
`;

const typeDefs = mergeTypeDefs([helloSchema, userSchema]);

module.exports = typeDefs;
