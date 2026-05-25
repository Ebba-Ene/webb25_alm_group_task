const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Ogiltig e-postadress"],
    },
    profileImage: {
      type: String, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
