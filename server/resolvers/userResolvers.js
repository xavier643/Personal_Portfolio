const User = require('../models/User');
const { addUser, login } = require('../authentication/auth'); // Adjust the path if necessary
const {generateToken, expiresIn} = require('../authentication/generateToken');

const userResolvers = {
  Query: {
    users: async (parent, args, contextValue) => {
      if (!contextValue.user) {
        throw new Error('Not authenticated');
      }

      return await User.find({})
    },
  },
  Mutation: {
    addUser: async (_, { name, email, username, password }) => await addUser({ name, email, username, password }),
    login: async (_, { username, password }) => await login(username, password),
    refreshToken: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const newToken = generateToken(user);
      return {
        token: newToken,
        expiresIn: expiresIn,
        user,
      };
    },
  },
};

module.exports = userResolvers;
