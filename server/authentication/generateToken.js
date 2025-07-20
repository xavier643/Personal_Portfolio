const jwt = require("jsonwebtoken");

const expiresIn = 2 * 60; // minutes converted to seconds

const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
      session_id: user.session_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: expiresIn, // Token expiration time
    }
  );

module.exports = { generateToken, expiresIn };
