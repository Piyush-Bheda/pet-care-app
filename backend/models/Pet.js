// models/Pet.js
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String
  },
  age: {
    type: Number
  },
  weight: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Pet", petSchema);