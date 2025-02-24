// textRouter.js
const { getUserSession } = require("./utils/redis");
const addWordFlow = require("./controllers/addWordsFlow");
const { handleListVocab } = require("./controllers/listVocabFlow");

module.exports = async (ctx) => {
  const userId = ctx.from.id.toString();
  const sessionData = (await getUserSession(userId)) || {};

  if (sessionData.state && sessionData.state.startsWith("adding")) {
    return addWordFlow.handleText(ctx, sessionData);
  }

  if (sessionData.state && sessionData.state.startsWith("list")) {
    return handleListVocab(ctx, sessionData);
  }

  return ctx.reply(
    "I'm not sure what you mean. Please use one of the menu options."
  );
};
