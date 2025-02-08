const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please tell us a username to call you with"],
    minlength: [5, "Username must be at least 5 characters"],
    maxlength: [20, "Username must be at most 20 characters"],
    trim: true,
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ],
  },
  telegramId: {
    type: String,
    required: [true, "Please provide your telegram id"],
    unique: true,
  },
  languages: [
    {
      type: String,
    },
  ],
  currentLanguage: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
