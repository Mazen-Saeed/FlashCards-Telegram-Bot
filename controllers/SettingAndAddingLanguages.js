const catchAsync = require("../utils/errorHandler");
const User = require("../models/userModel");
const { languageAdditionMenu } = require("../utils/replies");

exports.addLanguageAction = catchAsync(async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id.toString() });
  await languageAdditionMenu(ctx, user);
  await pushUserMenu(ctx.from.id.toString(), "languageAddition");
});
