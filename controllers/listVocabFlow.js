const {
  getUserSession,
  setUserSession,
  restoreState,
} = require("../utils/redis");
const Word = require("../models/flashcardModel");

exports.startListVocab = async (ctx) => {
  const userId = ctx.from.id.toString();
  let sessionData = (await getUserSession(userId)) || {};
  const words = await Word.find({ user: sessionData.user_id }).exec();

  if (words.length === 0) {
    return ctx.reply(
      "You haven't added any words yet. Use 'Add New Word' to get started!"
    );
  }

  const vocabList = words.map((word) => word._id.toString());
  vocabList.sort(() => Math.random() - 0.5);

  sessionData.vocabList = vocabList;
  sessionData.currentWordIndex = 0;
  sessionData.state = "listing_vocab";

  await setUserSession(userId, sessionData);

  return showCurrentWord(ctx, sessionData);
};

async function showCurrentWord(ctx, sessionData) {
  const userId = ctx.from.id.toString();
  const index = sessionData.currentWordIndex;

  if (index >= sessionData.vocabList.length) {
    sessionData.currentWordIndex = -1;
    vocabList.sort(() => Math.random() - 0.5);
    sessionData.vocabList = vocabList;
    await setUserSession(userId, sessionData);
    return ctx.reply(
      "You've seen all your words. Reply with 'done' to exit or 'next' again to start a new session."
    );
  }

  const wordId = sessionData.vocabList[index];
  const wordDoc = await Word.findById(wordId);

  let msg =
    "Word: " +
    wordDoc.word +
    "\n" +
    "Definitions: " +
    wordDoc.definitions.join("; ") +
    "\n" +
    "Examples: " +
    (wordDoc.examples.length ? wordDoc.examples.join("; ") : "N/A") +
    "\n" +
    "Note: " +
    (wordDoc.note || "N/A") +
    "\n" +
    "Topic: " +
    (wordDoc.topic || "N/A") +
    "\n\n" +
    "Reply with 'next' to see the next word or 'done' to finish.";

  return ctx.reply(msg);
}

exports.handleListVocab = async (ctx, sessionData) => {
  const userId = ctx.from.id.toString();
  const userInput = ctx.message.text.trim().toLowerCase();

  if (sessionData.state !== "listing_vocab") {
    return ctx.reply(
      "You're not currently viewing your vocabulary list. Please choose the correct option from the menu."
    );
  }

  if (userInput === "next") {
    sessionData.currentWordIndex++;
    await setUserSession(userId, sessionData);
    return showCurrentWord(ctx, sessionData);
  } else if (userInput === "done") {
    restoreState(userId);
    return ctx.reply(
      "Great job reviewing your vocabulary! Your hard work is paying off. Keep it up!"
    );
  } else {
    return ctx.reply(
      "Invalid input. Please reply with 'next' to view the next word or 'done' to exit."
    );
  }
};
