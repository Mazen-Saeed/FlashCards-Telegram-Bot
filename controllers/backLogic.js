const User = require("../models/userModel");
const catchAsync = require("../utils/errorHandler");
const { languageSelectionMenu } = require("../utils/replies");
const { redis } = require("../utils/redis");

exports.pushUserMenu = async (userId, menu) => {
  await redis.lpush(`user:${userId}:menu_history`, menu);
};

exports.popUserMenu = async (userId) => {
  return await redis.lpop(`user:${userId}:menu_history`);
};

exports.getLastMenu = async (userId) => {
  return await redis.lindex(`user:${userId}:menu_history`, 0);
};

exports.handleBackClick = catchAsync(async (ctx) => {
  const userId = ctx.from.id.toString();

  await this.popUserMenu(userId);
  const lastMenu = await this.getLastMenu(userId);
  if (lastMenu === "languageSelection") {
    const user = await User.findOne({ telegramId: userId });
    await languageSelectionMenu(ctx, user);
  }
});
