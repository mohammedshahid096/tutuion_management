const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  createNewLiveClassController,
  getAttendanceListController,
} = require("../../Controllers/attendance/attendance.controller");
const {
  currentBatchDetailMiddleWare,
} = require("../../Middlewares/batch.middleware");

const AttendanceRoutes = express.Router();

AttendanceRoutes.route("/:studentId/new-live-class").post(
  Authentication,
  Authorization(ADMIN),
  currentBatchDetailMiddleWare,
  createNewLiveClassController
);

AttendanceRoutes.route("/:studentId/attendances").get(
  Authentication,
  Authorization(ADMIN),
  currentBatchDetailMiddleWare,
  getAttendanceListController
);

module.exports = AttendanceRoutes;
