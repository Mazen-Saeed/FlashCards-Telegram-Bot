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
  languageClicked,
} = require("./controllers/SettingAndAddingLanguages");

const { startAddWord } = require("./controllers/addWordsFlow");
const { startListVocab } = require("./controllers/listVocabFlow");
const { handleBackClick, getLastMenu } = require("./controllers/backLogic");
const { helpAndGuide } = require("./controllers/helpAndGuideReply");
const { languageRegex } = require("./utils/supportedLanguages");
const textRouter = require("./textRouter");

mongoose
  .connect(process.env.DATABASE_URI, {
    dbName: "flashcardsBot",
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas.");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
    process.exit(1);
  });

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(startCommand);
bot.hears("✏️ Set Username", setUsernameAction);
bot.hears("➕ Add New Language", addLanguageAction);
bot.hears("❓ Help & Guide", helpAndGuide);
bot.hears("🔙 Back", handleBackClick);
bot.hears(languageRegex, languageClicked);
bot.hears("➕ Add a New Word", startAddWord);
bot.hears("📖 List My Vocabulary", startListVocab);
bot.command("setusername", setUsernameCommand);
bot.hears(/.*/, textRouter);

bot.launch().then(() => {
  console.log("🤖 Bot is running in polling mode...");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
