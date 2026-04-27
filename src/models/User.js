const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // TODO: Add profileImage field
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
