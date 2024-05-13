const userResolvers = require('./userResolvers');

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world! Connection to backend succeeded!!"
    },
    protectedData: (parent, args, context) => {
      // Check if the user is authenticated
      if (!context.user) {
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
