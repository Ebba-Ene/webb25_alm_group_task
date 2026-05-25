const mongoose = require("mongoose")

const accommodationSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Zip Code is required'],
      trim: true
    },

    rent: {
      type: Number,
      min: 0,
      required: [true, 'Rent is required'],
      trim: true
    },
    room: {
      type: Number,
      min: 1,
      required: [true, 'Room is required'],
      trim: true
    }, 

    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  }, {
    timestamps: true
  }
)

module.exports =
  mongoose.models.Accommodation ||
  mongoose.model("Accommodation", accommodationSchema)
