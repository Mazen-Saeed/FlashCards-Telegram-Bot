const Redis = require("ioredis");
const redis = new Redis();

async function setUserSession(userId, sessionData) {
  await redis.set(`session:${userId}`, JSON.stringify(sessionData));
}

async function getUserSession(userId) {
  const data = await redis.get(`session:${userId}`);
  return data ? JSON.parse(data) : null;
}

async function restoreState(userId) {
  let sessionData = (await getUserSession(userId)) || {};
  const currentLang = sessionData.currentLanguage;
  const id = sessionData.user_id;
  sessionData = {};
  sessionData.user_id = id;
  sessionData.currentLanguage = currentLang;
  sessionData.state = "language_selected";
  await setUserSession(userId, sessionData);
}

module.exports = { redis, setUserSession, getUserSession, restoreState };
