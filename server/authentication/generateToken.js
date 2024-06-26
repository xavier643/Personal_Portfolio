const jwt = require('jsonwebtoken');

const expiresIn = 60 * 60; // minutes converted to seconds

const generateToken = (user) => jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
  expiresIn: expiresIn, // Token expiration time
});

module.exports = {generateToken, expiresIn};
