// routes/petRoutes.js
const router = require("express").Router();
const Pet = require("../models/Pet");
const auth = require("../middleware/authMiddleware");


// CREATE PET
router.post("/", auth, async (req, res) => {
  try {
    const { name, breed, age, weight } = req.body;

    const pet = await Pet.create({
      userId: req.user.id,
      name,
      breed,
      age,
      weight
    });

    res.json(pet);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL PETS (for logged user)
router.get("/", auth, async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.user.id });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET SINGLE PET
router.get("/:id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(pet);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE PET
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedPet = await Pet.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(updatedPet);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE PET
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedPet = await Pet.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deletedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json({ message: "Pet deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;