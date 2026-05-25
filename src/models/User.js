const mongoose = require("mongoose")
const Accommodation = require("./Accommodation")

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
  { timestamps: true },
)
userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getFilter())

  if (user) {
    await Accommodation.deleteMany({ user: user._id })
  }

  next()
})

module.exports = mongoose.model("User", userSchema)
