const logger = require("../Config/logger.config");
const notificationModel = require("../Schema/notification/notification.schema");
const errorHandling = require("../Utils/errorHandling");
const moment = require("moment");
const axios = require("axios");

const deleteNotificationUtility = async () => {
  try {
    logger.info(
      "Utils - notification.cron - deleteNotificationUtility - Start"
    );

    const twoDaysAgo = moment().subtract(2, "days").startOf("day").toDate();
    const result = await notificationModel.deleteMany({
      createdAt: { $lte: twoDaysAgo },
    });
    logger.info(
      `Deleted ${result.deletedCount} notifications older than 2 days.`
    );
    logger.info("Utils - notification.cron - deleteNotificationUtility - End");
  } catch (error) {
    logger.error(
      "Utils - notification.cron - deleteNotificationUtility - Error",
      error
    );
    throw error;
  }
};

const renderServerAwakeUtility = async () => {
  try {
    logger.info("notification.cron - renderServerAwakeUtility - Start");
    const url = "https://tutuion-management-backend.vercel.app";
    const response = await axios.get(url);
    console.log(response.data);
    logger.info("notification.cron - renderServerAwakeUtility - End");
  } catch (error) {
    logger.error("notification.cron - renderServerAwakeUtility - End", error);
  }
};

module.exports = {
  deleteNotificationUtility,
  renderServerAwakeUtility,
};
