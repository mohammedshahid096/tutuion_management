const cron = require("node-cron");

const createLiveClassRemindersCronJob = () => {
  cron.schedule(
    "* * * * *",
    () => {
      console.log("Running daily job at 6 AM");
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

module.exports = {
  createLiveClassRemindersCronJob,
};
