// routes/reminderRoutes.js
const router = require("express").Router();
const Reminder = require("../models/Reminder");
const auth = require("../middleware/authMiddleware");

// CREATE REMINDER
router.post("/", auth, async (req, res) => {
  try {
    const { petId, type, dateTime } = req.body;

    const reminder = await Reminder.create({
      userId: req.user.id,
      petId,
      type,
      dateTime
    });

    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL REMINDERS
router.get("/", auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id })
      .populate("petId", "name");
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALERTS (messages previously printed to console)
router.get("/alerts", auth, async (req, res) => {
  try {
    const alerts = await Reminder.find({
      userId: req.user.id,
      notified: true,
      acknowledged: false
    })
      .sort({ notifiedAt: -1 })
      .limit(20)
      .populate("petId", "name");

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ACKNOWLEDGE alert (dismiss on dashboard)
router.put("/:id/ack", auth, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { acknowledged: true },
      { new: true }
    );

    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MARK COMPLETE
router.put("/:id", auth, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "completed" },
      { new: true }
    );

    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;