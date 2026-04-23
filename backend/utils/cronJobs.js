// utils/cronJobs.js
const cron = require("node-cron");
const Reminder = require("../models/Reminder");

cron.schedule("* * * * *", async () => {
  console.log("Checking reminders...");

  const now = new Date();

  const dueReminders = await Reminder.find({
    dateTime: { $lte: now },
    status: "pending",
    notified: false
  }).populate("petId", "name");

  dueReminders.forEach(async (reminder) => {
    console.log(
      `Reminder: ${reminder.type} for ${reminder.petId.name}`
    );

    // Mark as notified so it can be shown to the user
    reminder.notified = true;
    reminder.notifiedAt = now;
    await reminder.save();
  });
});