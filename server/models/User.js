const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    session_id: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email addresses are unique in the database
    },
    username: {
      type: String,
      required: true,
      unique: true, // Optionally make username unique as well
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
