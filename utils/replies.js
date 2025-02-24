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
    "📝 Please set your username by sending: \n\n`/setusername your_chosen_name`",
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

exports.mainMenu = async (ctx) => {
  return ctx.reply(
    "📌 Main Menu: Choose an action below ⬇️",
    Markup.keyboard(markups.mainMenu).resize()
  );
};

exports.helpAndGuideReply = async (ctx) => {
  return ctx.reply(
    "❓ **Help & Guide**\n\n🚀 This bot helps you learn new words, take quizzes, and track your progress.\n\n🔹 More details will be added here soon...",
    { parse_mode: "Markdown" }
  );
};

exports.addWordReply = async (ctx) => {
  return ctx.reply(
    "🆕 **Add a New Word**\n\n" +
      "Follow these steps to add a new word:\n\n" +
      "1️⃣ **Enter the Word**: Start by typing the word you want to add.\n\n" +
      "2️⃣ **Add Definitions**: I'll prompt you to enter at least one definition. After each definition, you'll have the options to:\n" +
      "   - Add another definition\n" +
      "   - Add an example\n" +
      "   - Finish and save the word\n\n" +
      "3️⃣ **Add Examples** (Optional): If you choose to add an example, you'll be asked whether you want to:\n" +
      "   - Add another example\n" +
      "   - Add a note\n" +
      "   - Finish and save the word\n\n" +
      "4️⃣ **Add a Note** (Optional): Provide any extra context or information about the word.\n\n" +
      "Just follow the prompts, and your new word will be saved once you're finished.",
    { parse_mode: "Markdown" }
  );
};
