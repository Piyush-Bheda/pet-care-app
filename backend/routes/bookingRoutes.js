const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Service = require("../models/Service");
const Booking = require("../models/Booking");

// CREATE BOOKING
router.post("/", auth, async (req, res) => {
  try {
    const { serviceId, date, time } = req.body;

    if (!serviceId) return res.status(400).json({ message: "serviceId is required" });
    if (!date) return res.status(400).json({ message: "date is required" });

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Minimal datetime handling:
    // - if time is provided ("HH:mm"), combine it with date ("YYYY-MM-DD")
    // - else store date-only at local midnight
    let dateTime;
    if (typeof time === "string" && time.trim()) {
      dateTime = new Date(`${date}T${time}:00`);
    } else {
      dateTime = new Date(`${date}T00:00:00`);
    }

    if (Number.isNaN(dateTime.getTime())) {
      return res.status(400).json({ message: "Invalid date/time" });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      serviceId,
      date: dateTime,
      status: "booked"
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LIST MY BOOKINGS (newest first)
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("serviceId", "name price description");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

