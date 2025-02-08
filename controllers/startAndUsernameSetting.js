const User = require("../models/userModel");
const catchAsync = require("../utils/errorHandler");
const {
  newUserMenu,
  languageSelectionMenu,
  setUsernameReply,
} = require("../utils/replies");

const { pushUserMenu } = require("./backLogic");

exports.startCommand = catchAsync(async (ctx) => {
  const telegramId = ctx.from.id.toString();
  const user = await User.findOne({ telegramId });
  if (user) {
    await languageSelectionMenu(ctx, user);
    await pushUserMenu(telegramId, "languageSelection");
  } else {
    await newUserMenu(ctx);
  }
});

exports.setUsernameAction = catchAsync(async (ctx) => {
  await setUsernameReply(ctx);
});

exports.setUsernameCommand = catchAsync(async (ctx) => {
  const telegramId = ctx.from.id.toString();
  const newUserName = ctx.message.text.split(" ")[1];

  const user = await User.create({ telegramId, userName: newUserName });

  await languageSelectionMenu(ctx, user);
  await pushUserMenu(telegramId, "languageSelection");
});
