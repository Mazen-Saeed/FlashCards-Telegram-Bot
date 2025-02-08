module.exports = (fn) => (ctx) =>
  Promise.resolve(fn(ctx)).catch((err) => {
    let error;
    let msg;

    if (err.name === "ValidationError") {
      if (err.errors.userName) {
        msg =
          "📝 Please set your username by sending: \n\n`/setUserName your_chosen_name`";
      }
      error = handleValidationErrorDB(err);
    } else {
      error = "Oops! An error occurred.";
    }

    ctx.reply(error);
    if (msg) {
      ctx.reply(msg, {
        parse_mode: "Markdown",
      });
    }
  });

const handleValidationErrorDB = (error) => {
  const msg = Object.values(error.errors)
    .map((err) => err.message)
    .join(", ");
  return `${msg}. Please enter valid information`;
};
