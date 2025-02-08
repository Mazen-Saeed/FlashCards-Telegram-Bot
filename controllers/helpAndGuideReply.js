const catchAsync = require("../utils/errorHandler");
const { helpAndGuideReply } = require("../utils/replies");
exports.helpAndGuide = catchAsync(async (ctx) => {
  await helpAndGuideReply(ctx);
});
