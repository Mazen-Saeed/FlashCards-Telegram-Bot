const markups = require("../utils/markups");
const { Markup } = require("telegraf");

exports.languageSelectionMenu = async (ctx, user) => {
  return ctx.reply(
    `📚 Welcome, ${user.userName}! Ready to strengthen your language skills and master new words today? 🚀`,
    Markup.keyboard(markups.getLanguageSelectionMarkup(user.languages)).resize()
  );
};

exports.newUserMenu = async (ctx) => {
  return ctx.reply(
    "👋 Welcome to FlashCardsBot! Let’s get started:",
    Markup.keyboard(markups.newUserMenu).resize()
  );
};

exports.setUsernameReply = async (ctx) => {
  return ctx.reply(
    "📝 Please set your username by sending: \n\n`/setUsername your_chosen_name`",
    { parse_mode: "Markdown" }
  );
};

exports.languageAdditionMenu = async (ctx, user) => {
  return ctx.reply(
    "🌍 Select a language you want to learn:",
    Markup.keyboard(markups.getLanguageAdditionMarkup(user.languages)).resize()
  );
};

exports.helpAndGuideReply = async (ctx) => {
  return ctx.reply(
    "❓ **Help & Guide**\n\n🚀 This bot helps you learn new words, take quizzes, and track your progress.\n\n🔹 More details will be added here soon...",
    { parse_mode: "Markdown" }
  );
};
