const Redis = require("ioredis");
const redis = new Redis();
const User = require("../models/userModel");
const catchAsync = require("../utils/errorHandler");
const { languageSelectionMenu } = require("../utils/replies");

exports.pushUserMenu = async (userId, menu) => {
  await redis.lpush(`user:${userId}:menu_history`, menu);
};

const popUserMenu = async (userId) => {
  return await redis.lpop(`user:${userId}:menu_history`);
};

const getLastMenu = async (userId) => {
  return await redis.lindex(`user:${userId}:menu_history`, 0);
};

exports.handleBackClick = catchAsync(async (ctx) => {
  const userId = ctx.from.id.toString();

  await popUserMenu(userId);
  const lastMenu = await getLastMenu(userId);
  console.log(lastMenu);
  if (lastMenu === "languageSelection") {
    const user = await User.findOne({ telegramId: userId });
    await languageSelectionMenu(ctx, user);
  }
});
