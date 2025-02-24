const {
  setUserSession,
  getUserSession,
  restoreState,
} = require("../utils/redis");
const Word = require("../models/flashcardModel");
exports.handleText = async (ctx, sessionData) => {
  const userId = ctx.from.id.toString();
  const userInput = ctx.message.text.trim();

  switch (sessionData.state) {
    case "adding_word_await":
      await handleWordInput(ctx, userInput, sessionData, userId);
      break;

    case "adding_definition_await":
      await handleDefinitionInput(ctx, userInput, sessionData, userId);
      break;

    case "adding_definition_options":
      await handleDefinitionOptions(ctx, userInput, sessionData, userId);
      break;

    case "adding_example_await":
      await handleExampleInput(ctx, userInput, sessionData, userId);
      break;

    case "adding_example_options":
      await handleExampleOptions(ctx, userInput, sessionData, userId);
      break;

    case "adding_note_await":
      await handleNoteInput(ctx, userInput, sessionData, userId);
      break;

    case "adding_note_options":
      await handleNoteOptions(ctx, userInput, sessionData, userId);
      break;

    case "adding_topic_await":
      await handleTopicInput(ctx, userInput, sessionData, userId);
      break;

    default:
      await ctx.reply(
        "I'm not sure what you mean. Please use one of the menu options."
      );
      break;
  }
};

exports.startAddWord = async (ctx) => {
  const userId = ctx.from.id.toString();
  let sessionData = (await getUserSession(userId)) || {};

  sessionData.state = "adding_word_await";
  sessionData.word = "";
  sessionData.definitions = [];
  sessionData.examples = [];
  sessionData.note = "";
  sessionData.topic = "";

  await setUserSession(userId, sessionData);

  await ctx.reply("Please enter the new word:");
};

async function handleWordInput(ctx, userInput, sessionData, userId) {
  sessionData.word = userInput;
  sessionData.state = "adding_definition_await";
  await setUserSession(userId, sessionData);

  await ctx.reply(
    "Great! Now, please enter at least one definition for this word."
  );
}

async function handleDefinitionInput(ctx, userInput, sessionData, userId) {
  sessionData.definitions.push(userInput);
  sessionData.state = "adding_definition_options";
  await setUserSession(userId, sessionData);

  await ctx.reply(
    "Definition added! Reply with:\n" +
      "- definition to add another definition\n" +
      "- example to add an example\n" +
      "- topic to add a subject/topic\n" +
      "- done to finish"
  );
}

async function handleDefinitionOptions(ctx, userInput, sessionData, userId) {
  const choice = userInput.toLowerCase();

  if (choice === "definition") {
    sessionData.state = "adding_definition_await";
    await setUserSession(userId, sessionData);
    return ctx.reply("Please enter another definition:");
  } else if (choice === "example") {
    sessionData.state = "adding_example_await";
    await setUserSession(userId, sessionData);
    return ctx.reply("Please enter an example for the word:");
  } else if (choice === "topic") {
    sessionData.state = "adding_topic_await";
    await setUserSession(userId, sessionData);
    return ctx.reply("Please enter the subject or topic for this word:");
  } else if (choice === "done") {
    await finalizeWord(ctx, sessionData, userId);
  } else {
    return ctx.reply(
      "Invalid option. Please reply with 'definition', 'example', 'topic', or 'done'."
    );
  }
}

async function handleExampleInput(ctx, userInput, sessionData, userId) {
  sessionData.examples.push(userInput);
  sessionData.state = "adding_example_options";
  await setUserSession(userId, sessionData);

  await ctx.reply(
    "Example added! Reply with:\n" +
      "- example to add another example\n" +
      "- note to add a note\n" +
      "- topic to add a subject/topic\n" +
      "- done to finish"
  );
}

async function handleExampleOptions(ctx, userInput, sessionData, userId) {
  const choice = userInput.toLowerCase();

  if (choice === "example") {
    sessionData.state = "adding_example_await";
    await setUserSession(userId, sessionData);
    return ctx.reply("Please enter another example:");
  } else if (choice === "note") {
    sessionData.state = "adding_note_await";
    await setUserSession(userId, sessionData);
    return ctx.reply("Please enter a note for the word:");
  } else if (choice === "topic") {
    sessionData.state = "adding_topic_await";
    await setUserSession(userId, sessionData);
    return ctx.reply("Please enter the subject or topic for this word:");
  } else if (choice === "done") {
    await finalizeWord(ctx, sessionData, userId);
  } else {
    return ctx.reply(
      "Invalid option. Please reply with 'example', 'note', 'topic', or 'done'."
    );
  }
}

async function handleNoteInput(ctx, userInput, sessionData, userId) {
  sessionData.note = userInput;
  sessionData.state = "adding_note_options";
  await setUserSession(userId, sessionData);

  await ctx.reply(
    "Note added! Reply with:\n" +
      "- topic to add a subject/topic\n" +
      "- done to finish"
  );
}

async function handleNoteOptions(ctx, userInput, sessionData, userId) {
  const choice = userInput.toLowerCase();
  if (choice === "topic") {
    sessionData.state = "adding_topic_await";
    await setUserSession(userId, sessionData);
    return ctx.reply("Please enter the subject or topic for this word:");
  } else if (choice === "done") {
    await finalizeWord(ctx, sessionData, userId);
  } else {
    return ctx.reply("Invalid option. Please reply with 'topic' or 'done'.");
  }
}

async function handleTopicInput(ctx, userInput, sessionData, userId) {
  sessionData.topic = userInput;
  await finalizeWord(ctx, sessionData, userId);
}

async function finalizeWord(ctx, sessionData, userId) {
  try {
    const newWord = await Word.create({
      user: sessionData.user_id,
      language: sessionData.currentLanguage,
      word: sessionData.word,
      definitions: sessionData.definitions,
      examples: sessionData.examples,
      note: sessionData.note,
      topic: sessionData.topic,
    });

    await ctx.reply(
      "Your new word " +
        sessionData.word +
        " has been added!\n" +
        "Definitions: " +
        sessionData.definitions.join("; ") +
        "\n" +
        "Examples: " +
        sessionData.examples.join("; ") +
        "\n" +
        "Note: " +
        (sessionData.note || "N/A") +
        "\n" +
        "Topic: " +
        (sessionData.topic || "N/A")
    );
  } catch (error) {
    console.error("Error saving word to DB:", error);
    await ctx.reply("There was an error saving your word. Please try again.");
  }

  restoreState(userId);
  await setUserSession(userId, sessionData);
}
