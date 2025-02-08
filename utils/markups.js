const { languages } = require("./supportedLanguages");

module.exports = {
  mainMenu: [
    ["➕ Add Word"],
    ["📋 My Words"],
    ["📝 Take a Quiz", "quiz"],
    ["📅 Daily Word", "daily_words"],
    ["📊 Progress Report", "report"],
    ["❓ Help & Guide", "help"],
  ],

  newUserMenu: [["✏️ Set Username"], ["❓ Help & Guide"]],

  getLanguageSelectionMarkup: (languages) => {
    const buttons = [];
    for (let i = 0; i < languages.length; i += 3) {
      buttons.push(languages.slice(i, i + 3).map((lang) => `🌍 ${lang}`));
    }

    buttons.push(["➕ Add New Language"]);

    return buttons;
  },

  getLanguageAdditionMarkup: (userLanguages) => {
    const availableLanguages = languages.filter(
      (lang) => !userLanguages.includes(lang)
    );

    const buttons = [];
    for (let i = 0; i < availableLanguages.length; i += 3) {
      buttons.push(availableLanguages.slice(i, i + 3));
    }

    buttons.push(["🔙 Back"]);

    return buttons;
  },
};
