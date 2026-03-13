const mongoose = require("mongoose");

/**
 * Schema for storing blacklisted JWT tokens
 * When a user logs out, the token will be saved here
 */
const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required and cannot be blackliste"],
      //   unique: true,
    },
  },
  {
    timestamps: true,
  },
);
const tokenBlacklistModel = mongoose.model(
  "blacklistToken",
  blacklistTokenSchema,
);
module.exports = tokenBlacklistModel;
