const mongoose = require("mongoose")

const accommodationSchema = new mongoose.Schema(
  {
    adress: {
      type: String,
      required: [true, 'Adress is required'],
      trim: true
    },
    stad: {
      type: String,
      required: [true, 'Stad is required'],
      trim: true
    },
    land: {
      type: String,
      required: [true, 'Land is required'],
      trim: true
    },
    postnummer: {
      type: String,
      required: [true, 'Postnummer is required'],
      trim: true
    },

    hyra: {
      type: Number,
      min: 0,
      required: [true, 'Hyra is required'],
      trim: true
    },
    rum: {
      type: Number,
      min: 1,
      required: [true, 'Rum is required'],
      trim: true
    }, 

    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Accommodation', accommodationSchema)
