const { mergeTypeDefs } = require('@graphql-tools/merge');
const userSchema = require('./userSchema');

const helloSchema = `
  type Query {
    hello: String
  }
`;

const typeDefs = mergeTypeDefs([helloSchema, userSchema]);

module.exports = typeDefs;
