const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  getNotesDetailsController,
} = require("../../Controllers/notes/notes.controller");

const NotificationRoutes = express.Router();

NotificationRoutes.route("/notifications-list").get(
  Authentication,
  Authorization(ADMIN),
  getNotesDetailsController
);

module.exports = NotificationRoutes;
