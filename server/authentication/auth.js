// auth.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken, expiresIn } = require("./generateToken");
const { v4: uuidv4 } = require("uuid");

// Local strategy for username and password login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// User registration function
const addUser = async ({ name, email, username, password, role = "user" }) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    name,
    email,
    username,
    password: hashedPassword,
    role,
  });
  await newUser.save();
  return newUser;
};

// User login function
const login = async (username, password) => {
  console.log("logging in: ", username);
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  // Create a new session ID and save it to the user
  const session_id = uuidv4();
  user.session_id = session_id;
  await user.save();

  console.log("user: ", user);

  const updatedUser = await User.findById(user._id); // pull the updated version
  const token = generateToken(updatedUser);

  console.log("updatedUser: ", updatedUser);

  return {
    token,
    user,
    expiresIn,
  };
};

// User logout function
const logout = async (_, __, contextValue) => {
  console.log("logging out...");
  if (!contextValue.user) {
    throw new Error("Not authenticated");
  }

  const user = await User.findById(contextValue.user.id);
  console.log("🔑 user in logout context:", contextValue.user);
  if (!user) {
    throw new Error("User not found");
  }

  user.session_id = null;
  await user.save();
  return true;
};

// User update function
const updateUser = async ({ id, name, email, username, password, role }) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const updateFields = {};
  if (name) updateFields.name = name;
  if (email && email !== user.email) updateFields.email = email;
  if (username && username !== user.username) updateFields.username = username;
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    updateFields.password = bcrypt.hashSync(password, salt);
  }
  if (role) updateFields.role = role;

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.id !== id) {
      throw new Error("Email already in use");
    }
    updateFields.email = email;
  }

  if (username && username !== user.username) {
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser.id !== id) {
      throw new Error("Username already in use");
    }
    updateFields.username = username;
  }

  Object.assign(user, updateFields);
  await user.save();
  return user;
};

// User delete function
const deleteUser = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result ? true : false;
};

module.exports = { passport, addUser, login, updateUser, deleteUser, logout };
