const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Service = require("../models/Service");

// LIST SERVICES (static/seeded)
router.get("/", auth, async (req, res) => {
  try {
    const services = await Service.find({}).sort({ name: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

