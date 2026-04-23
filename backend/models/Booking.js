const mongoose = require("mongoose");

const BOOKING_STATUSES = ["booked", "completed"];

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "booked"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
module.exports.BOOKING_STATUSES = BOOKING_STATUSES;

