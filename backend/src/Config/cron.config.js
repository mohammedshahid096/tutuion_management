const cron = require("node-cron");
const { createNewLiveClassUtility } = require("../Utils/classReminder.cron");

const createLiveClassRemindersCronJob = () => {
  cron.schedule(
    "* * * * *",
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
