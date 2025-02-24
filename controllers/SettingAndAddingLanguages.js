const catchAsync = require("../utils/errorHandler");
const User = require("../models/userModel");
const { pushUserMenu, popUserMenu, getLastMenu } = require("./backLogic");
const { languageAdditionMenu, mainMenu } = require("../utils/replies");
const { languageRegex } = require("../utils/supportedLanguages");
const { getUserSession, setUserSession } = require("../utils/redis");

exports.addLanguageAction = catchAsync(async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id.toString() });
  await languageAdditionMenu(ctx, user);
  await pushUserMenu(ctx.from.id.toString(), "languageAddition");
});

const languageAddedLogic = async (ctx, language) => {
  const user = await User.findOne({ telegramId: ctx.from.id.toString() });
  const userId = ctx.from.id.toString();
  user.languages.push(language);
  await user.save();
  let sessionData = (await getUserSession(userId)) || {};
  sessionData.currentLanguage = language;
  sessionData.state = "language_selected";
  sessionData.user_id = user._id;
  user.languages.push(language);
  user;
  await setUserSession(userId, sessionData);
  await mainMenu(ctx);
  await popUserMenu(ctx.from.id.toString());
  await pushUserMenu(ctx.from.id.toString(), "mainMenu");
};

const languageSelectedLogic = async (ctx, language) => {
  const user = await User.findOne({ telegramId: ctx.from.id.toString() });
  const userId = ctx.from.id.toString();
  let sessionData = (await getUserSession(userId)) || {};
  sessionData.currentLanguage = language;
  sessionData.state = "language_selected";
  sessionData.user_id = user._id;
  await setUserSession(userId, sessionData);
  await mainMenu(ctx);
  await pushUserMenu(userId, "mainMenu");
};

exports.languageClicked = catchAsync(async (ctx) => {
  const telegramId = ctx.from.id.toString();
  const lastMenu = await getLastMenu(telegramId);
  const matchedLanguage = ctx.message.text.match(languageRegex)[0];

  const language = matchedLanguage.split(" ")[1];

  if (lastMenu == "languageAddition") {
    await languageAddedLogic(ctx, language);
  } else if (lastMenu == "languageSelection") {
    await languageSelectedLogic(ctx, language);
  }
});
