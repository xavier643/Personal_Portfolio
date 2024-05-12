const userResolvers = require('./userResolvers');

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world! Connection to backend succeeded!!"
    },
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
  }
};

module.exports = resolvers;
