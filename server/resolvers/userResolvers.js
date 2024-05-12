const User = require('../models/User');

const userResolvers = {
  Query: {
    users: async () => await User.find({})
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    }
  }
};

module.exports = userResolvers;
