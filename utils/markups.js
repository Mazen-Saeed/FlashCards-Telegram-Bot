const { languages } = require("./supportedLanguages");

module.exports = {
  mainMenu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: "➕ Add Word", callback_data: "add_word" }],
        [{ text: "📋 My Words", callback_data: "list_words" }],
        [{ text: "📝 Take a Quiz", callback_data: "quiz" }],
        [{ text: "📅 Daily Word", callback_data: "daily_words" }],
        [{ text: "📊 Progress Report", callback_data: "report" }],
        [{ text: "❓ Help & Guide", callback_data: "help" }],
      ],
    },
  },

  mainMenuButton: {
    reply_markup: {
      inline_keyboard: [[{ text: "📋 Main Menu", callback_data: "main_menu" }]],
    },
  },

  newUserMenu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: "✏️ Set Username", callback_data: "set_username" }],
        [{ text: "❓ Help & Guide", callback_data: "help" }],
      ],
    },
  },

  getLanguageSelectionMarkup: (languages) => {
    const buttons = languages.map((lang) => [
      { text: `🌍 ${lang}`, callback_data: `set_language_${lang}` },
    ]);
    buttons.push([
      { text: "➕ Add New Language", callback_data: "add_language" },
    ]);

    return {
      reply_markup: {
        inline_keyboard: buttons,
      },
    };
  },

  getLanguageAdditionMarkup: (userLanguages) => {
    const buttons = languages
      .filter((lang) => !userLanguages.includes(lang))
      .map((lang) => [{ text: lang, callback_data: `add_language_${lang}` }]);

    return {
      reply_markup: {
        inline_keyboard: buttons,
      },
    };
  },
};
