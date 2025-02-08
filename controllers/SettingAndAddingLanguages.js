const catchAsync = require("../utils/errorHandler");
const User = require("../models/userModel");
const markups = require("../utils/markups");
exports.addLanguageAction = catchAsync(async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id.toString() });
  ctx.answerCbQuery();
  ctx.reply(
    "🌍 Please select the language you want to add",
    markups.getLanguageAdditionMarkup(user.languages)
  );
});
