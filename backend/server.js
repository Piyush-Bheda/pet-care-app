const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Cron Jobs
require("./utils/cronJobs");
const { seedServicesIfEmpty } = require("./utils/seedServices");

const app = express();

const authMiddleware = require("./middleware/authMiddleware");

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/petcare")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

mongoose.connection.once("open", async () => {
  try {
    await seedServicesIfEmpty();
  } catch (err) {
    console.log("Service seeding failed:", err.message);
  }
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/reminders", require("./routes/remainderRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));