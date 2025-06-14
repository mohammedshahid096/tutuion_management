const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  getNotificationsController,
  updateNotificationController,
} = require("../../Controllers/notifcations/notification.controller");

const NotificationRoutes = express.Router();

NotificationRoutes.route("/notifications-list").get(
  Authentication,
  Authorization(ADMIN),
  getNotificationsController
);

NotificationRoutes.route("/:notificationId").get(
  Authentication,
  Authorization(ADMIN),
  updateNotificationController
);

module.exports = NotificationRoutes;
