const User = require("../models/userModel"); // Import User model
const catchAsync = require("../utils/errorHandler");
const markups = require("../utils/markups");
exports.startCommand = catchAsync(async (ctx) => {
  const telegramId = ctx.from.id.toString();
  const user = await User.findOne({ telegramId });

  if (user) {
    return ctx.reply(
      `📚 Welcome back, ${user.userName}! Ready to strengthen your language skills and master new words today? 🚀`,
      markups.getLanguageSelectionMarkup(user.languages)
    );
  }

  ctx.reply(
    "👋 Welcome to FlashCardsBot! Let’s get started:",
    markups.newUserMenu
  );
});

exports.setUsernameAction = (ctx) => {
  ctx.answerCbQuery(); // Close the button UI
  ctx.reply(
    "📝 Please set your username by sending: \n\n`/setUserName your_chosen_name`",
    {
      parse_mode: "Markdown",
    }
  );
};

exports.setUsernameCommand = catchAsync(async (ctx) => {
  const telegramId = ctx.from.id.toString();
  await User.create({
    telegramId,
    userName: ctx.message.text.split(" ")[1],
  });
  ctx.reply(
    "🎉 Username set successfully!",
    markups.getLanguageSelectionMarkup([])
  );
});
