const { languages, languageWithFlag } = require("./supportedLanguages");

module.exports = {
  mainMenu: [
    ["➕ Add a New Word", "✏️ Edit Word", "🗑️ Delete Word"],
    ["📖 List My Vocabulary", "🔄 Revise Words"],
    ["🔊 Listen to Word", "📝 Take a Quiz"],
    ["📅 Daily Word Challenge", "📊 Learning Progress"],
    ["❓ Help & Guide", "⚙️ Settings"],
    ["🚫 Reset Language Progress", "❌ Delete Language"],
    ["🌍 Change Language", "🔙 Back"],
  ],
  newUserMenu: [["✏️ Set Username"], ["❓ Help & Guide"]],

  getLanguageSelectionMarkup: (languages) => {
    const buttons = [];
    for (let i = 0; i < languages.length; i += 3) {
      buttons.push(
        languages.slice(i, i + 3).map((lang) => languageWithFlag[lang])
      );
    }

    buttons.push(["➕ Add New Language"]);

    return buttons;
  },

  getLanguageAdditionMarkup: (userLanguages) => {
    const availableLanguages = languages.filter(
      (lang) => !userLanguages.includes(lang.split(" ")[1])
    );

    const buttons = [];
    for (let i = 0; i < availableLanguages.length; i += 3) {
      buttons.push(availableLanguages.slice(i, i + 3));
    }

    buttons.push(["🔙 Back"]);

    return buttons;
  },
};
