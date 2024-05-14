// auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path if necessary
const generateToken = require('./generateToken'); // Adjust the path if necessary

// Local strategy for username and password login
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

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
const addUser = async ({ name, email, username, password }) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({ name, email, username, password: hashedPassword });
  await newUser.save();
  return newUser;
};

// User login function
const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user);

  return {
    token,
    user
  };
};

module.exports = { passport, addUser, login };
