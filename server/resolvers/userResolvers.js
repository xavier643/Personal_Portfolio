const User = require("../models/User");
const {
  addUser,
  login,
  updateUser,
  deleteUser,
  logout,
} = require("../authentication/auth"); // Adjust the path if necessary
const { generateToken, expiresIn } = require("../authentication/generateToken");

const userResolvers = {
  Query: {
    users: async (parent, { limit = 5, skip = 0 }, contextValue) => {
      if (!contextValue.user) {
        throw new Error("Not authenticated");
      } else if (contextValue.user.role !== "admin") {
        throw new Error("Not authorized");
      }

      return await User.find({}).limit(limit).skip(skip);
    },
  },
  Mutation: {
    addUser: async (
      _,
      { name, email, username, password, role },
      contextValue
    ) => {
      if (!contextValue.user || contextValue.user.role !== "admin") {
        throw new Error("Not authorized");
      }
      return await addUser({ name, email, username, password, role });
    },
    login: async (_, { username, password }) => {
      return await login(username, password);
    },
    logout: async (_, __, contextValue) => {
      console.log("WTF IS GOING ON");
      return await logout(_, __, contextValue);
    },
    refreshToken: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const dbUser = await User.findById(user.id);
      if (!dbUser || dbUser.session_id !== user.session_id) {
        throw new Error("Session invalid or expired");
      }

      const token = generateToken(dbUser);
      return {
        token,
        expiresIn,
      };
    },
    updateUser: async (
      _,
      { id, name, email, username, password, role },
      contextValue
    ) => {
      if (!contextValue.user || contextValue.user.role !== "admin") {
        throw new Error("Not authorized");
      }
      return await updateUser({ id, name, email, username, password, role });
    },
    deleteUser: async (_, { id }, contextValue) => {
      if (!contextValue.user || contextValue.user.role !== "admin") {
        throw new Error("Not authorized");
      }
      return await deleteUser(id);
    },
  },
};

module.exports = userResolvers;
