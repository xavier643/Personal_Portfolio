const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolvers = {
  Query: {
    users: async () => await User.find({})
  },
  Mutation: {
    addUser: async (_, { name, email, username, password }) => {
      // Hash the password before saving it to the database
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Include the username and hashed password in the new user document
      const newUser = new User({ name, email, username, password: hashedPassword });
      await newUser.save();
      return newUser;
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("No such user found");
      }

      const valid = bcrypt.compareSync(password, user.password); // Ensure this matches your schema field for the hashed password
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return {
        token,
        user
      };
    }
  }
};

module.exports = userResolvers;
