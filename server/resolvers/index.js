// resolvers.js
const userResolvers = require('./userResolvers');

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world! Connection to backend succeeded!!";
    },
    protectedData: (parent, args, contextValue) => {
      console.log("here...")
      console.log(contextValue)
      if (!contextValue.user) {
        throw new Error("Not authenticated");
      }
      return "This is protected data available only to authenticated users.";
    },
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
  }
};

module.exports = resolvers;
