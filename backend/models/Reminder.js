// models/Reminder.js
const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true
  },
  type: {
    type: String, // feeding, vaccination, vet
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  notified: {
    type: Boolean,
    default: false
  },
  notifiedAt: {
    type: Date,
    default: null
  },
  acknowledged: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Reminder", reminderSchema);