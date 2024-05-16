// resolvers.js
const userResolvers = require('./userResolvers');
const generateToken = require('../authentication/generateToken')

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world! Connection to backend succeeded!!";
    },
    protectedData: (parent, args, contextValue) => {
      if (!contextValue.user) {
        throw new Error("Not authenticated");
      }

      const newToken = generateToken(contextValue.user);

      return {
        message: "This is new message where you were authorized",
        token: newToken
      }
    },
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
  }
};

module.exports = resolvers;
