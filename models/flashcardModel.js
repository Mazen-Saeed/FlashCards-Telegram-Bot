const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  language: { type: String, required: true },
  word: {
    type: String,
    required: true,
    unique: true,
  },
  definitions: { type: [String] },
  examples: { type: [String] },
  note: { type: String },
  topic: { type: String },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Word", wordSchema);
