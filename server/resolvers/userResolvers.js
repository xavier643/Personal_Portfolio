const User = require('../models/User');
const { addUser, login } = require('../authentication/auth'); // Adjust the path if necessary

const userResolvers = {
  Query: {
    users: async () => await User.find({})
  },
  Mutation: {
    addUser: async (_, { name, email, username, password }) => {
      return await addUser({ name, email, username, password });
    },
    login: async (_, { username, password }) => {
      return await login(username, password);
    }
  }
};

module.exports = userResolvers;
