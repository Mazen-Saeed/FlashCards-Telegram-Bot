const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const markups = require("../utils/markups");
exports.addLanguageAction = catchAsync(async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id.toString() });
  ctx.answerCbQuery(); // Close the button UI
  ctx.reply(
    "🌍 Please select the language you want to add",
    markups.getLanguageAdditionMarkup(user.languages)
  );
});
