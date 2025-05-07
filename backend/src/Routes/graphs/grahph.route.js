const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");

const { ADMIN } = require("../../Constants/roles.constants");
const {
  adminDashboardGraphController,
} = require("../../Controllers/graphs/admin.controller");

const GraphRoutes = express.Router();

GraphRoutes.route("/admin/dashboard").get(
  Authentication,
  Authorization(ADMIN),
  adminDashboardGraphController
);

module.exports = GraphRoutes;
