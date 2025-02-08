module.exports = (fn) => (ctx) =>
  Promise.resolve(fn(ctx)).catch((err) => {
    console.error(err);
    ctx.reply("Oops! An error occurred.");
  });
