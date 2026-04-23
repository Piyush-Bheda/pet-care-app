const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Pet = require("../models/Pet");
const Activity = require("../models/Activity");
const { ALLOWED_ACTIVITY_TYPES } = require("../models/Activity");

// CREATE ACTIVITY (append-only)
router.post("/", auth, async (req, res) => {
  try {
    const { petId, type, notes, time } = req.body;

    if (!petId) return res.status(400).json({ message: "petId is required" });
    if (!type) return res.status(400).json({ message: "type is required" });
    if (!ALLOWED_ACTIVITY_TYPES.includes(type)) {
      return res.status(400).json({
        message: `Invalid activity type. Allowed: ${ALLOWED_ACTIVITY_TYPES.join(", ")}`
      });
    }

    const pet = await Pet.findOne({ _id: petId, userId: req.user.id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const activity = await Activity.create({
      userId: req.user.id,
      petId,
      type,
      notes: typeof notes === "string" ? notes : "",
      time: time ? new Date(time) : new Date()
    });

    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET HISTORY BY PET (newest first)
router.get("/pet/:petId", auth, async (req, res) => {
  try {
    const { petId } = req.params;

    const pet = await Pet.findOne({ _id: petId, userId: req.user.id });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const activities = await Activity.find({ userId: req.user.id, petId })
      .sort({ time: -1 })
      .limit(200);

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

