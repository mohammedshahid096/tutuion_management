const cron = require("node-cron");
const { createNewLiveClassUtility } = require("../Utils/classReminder.cron");

const createLiveClassRemindersCronJob = () => {
  cron.schedule(
    "0 6 * * *",
    () => {
      createNewLiveClassUtility();
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

module.exports = {
  createLiveClassRemindersCronJob,
};
