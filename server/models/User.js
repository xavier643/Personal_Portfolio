const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true  // Ensures email addresses are unique in the database
  },
  username: {
    type: String,
    required: true,
    unique: true  // Optionally make username unique as well
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
