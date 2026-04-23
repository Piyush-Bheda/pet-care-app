const mongoose = require("mongoose");

const ALLOWED_ACTIVITY_TYPES = [
  "feeding",
  "exercise",
  "medication",
  "grooming"
];

const activitySchema = new mongoose.Schema(
  {
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
      type: String,
      enum: ALLOWED_ACTIVITY_TYPES,
      required: true
    },
    notes: {
      type: String,
      default: ""
    },
    time: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
module.exports.ALLOWED_ACTIVITY_TYPES = ALLOWED_ACTIVITY_TYPES;

