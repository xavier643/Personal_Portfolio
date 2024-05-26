// resolvers.js
const userResolvers = require('./userResolvers');
const {generateToken, expiresIn} = require('../authentication/generateToken');

const resolvers = {
  Query: {
    hello: () => 'Hello world! Connection to backend succeeded!!',
    protectedData: (parent, args, contextValue) => {
      if (!contextValue.user) {
        throw new Error('Not authenticated');
      }

      const newToken = generateToken(contextValue.user);

      return {
        message: 'This is new message where you were authorized',
        token: newToken,
        expiresIn: expiresIn
      };
    },
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

module.exports = resolvers;
