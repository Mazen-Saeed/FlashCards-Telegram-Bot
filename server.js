require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const { Telegraf } = require("telegraf");

const {
  startCommand,
  setUsernameAction,
  setUsernameCommand,
} = require("./controllers/startAndUsernameSetting");
const {
  addLanguageAction,
} = require("./controllers/SettingAndAddingLanguages");

mongoose
  .connect(process.env.DATABASE_URI, {
    dbName: "flashcardsBot",
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas.");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
    process.exit(1); // Exit process on failure
  });

// Initialize bot with your token
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(startCommand);
bot.action("set_username", setUsernameAction);
bot.action("add_language", addLanguageAction);
bot.command("setUserName", setUsernameCommand);

// Launch bot in polling mode
bot.launch().then(() => {
  console.log("🤖 Bot is running in polling mode...");
});

// Handle graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
