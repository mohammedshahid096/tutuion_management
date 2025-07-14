const cron = require("node-cron");
const { createNewLiveClassUtility } = require("../Utils/classReminder.cron");
const {
  deleteNotificationUtility,
  renderServerAwakeUtility,
} = require("../Utils/notification.cron");

const createLiveClassRemindersCronJob = () => {
  cron.schedule(
    "0 6 * * *",
    () => {
      console.log("Running daily job at 6 AM");
      createNewLiveClassUtility();
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

const deleteNotificationCronJob = () => {
  cron.schedule(
    "0 1 * * *",
    () => {
      console.log("Running daily job at 1 AM");
      deleteNotificationUtility();
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

const renderServerAwakeCronJob = () => {
  //   Render's free tier spins down your server after 15 minutes of inactivity.
  // "Inactivity" is defined by a lack of inbound HTTP traffic (requests coming to your server from the outside world).

  cron.schedule("*/10 * * * *", () => {
    console.log("Cron job is running in every 10 minutes");
    renderServerAwakeUtility();
  });
};
module.exports = {
  createLiveClassRemindersCronJob,
  deleteNotificationCronJob,
  renderServerAwakeCronJob,
};
