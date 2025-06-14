const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  getNotificationsController,
} = require("../../Controllers/notifcations/notification.controller");

const NotificationRoutes = express.Router();

NotificationRoutes.route("/notifications-list").get(
  Authentication,
  Authorization(ADMIN),
  getNotificationsController
);

module.exports = NotificationRoutes;
