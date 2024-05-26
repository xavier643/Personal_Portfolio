const User = require('../models/User');
const { addUser, login, updateUser, deleteUser } = require('../authentication/auth'); // Adjust the path if necessary
const {generateToken, expiresIn} = require('../authentication/generateToken');

const userResolvers = {
  Query: {
    users: async (parent, { limit = 5, skip = 0 }, contextValue) => {
      if (!contextValue.user) {
        throw new Error('Not authenticated');
      } else if (contextValue.user.role !== 'admin') {
        throw new Error('Not authorized');
      }

      return await User.find({}).limit(limit).skip(skip);
    },
  },
  Mutation: {
    addUser: async (_, { name, email, username, password, role }, contextValue) => {
      if (!contextValue.user || contextValue.user.role !== 'admin') {
        throw new Error('Not authorized');
      }
      return await addUser({ name, email, username, password, role });
    },
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
    updateUser: async (_, { id, name, email, username, password, role }, contextValue) => {
      if (!contextValue.user || contextValue.user.role !== 'admin') {
        throw new Error('Not authorized');
      }
      return await updateUser({ id, name, email, username, password, role });
    },
    deleteUser: async (_, { id }, contextValue) => {
      if (!contextValue.user || contextValue.user.role !== 'admin') {
        throw new Error('Not authorized');
      }
      return await deleteUser(id);
    },
  },
};

module.exports = userResolvers;
