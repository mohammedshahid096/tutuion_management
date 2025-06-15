const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  createStudentHomeworkController,
} = require("../../Controllers/homework/homework.controller");
const {
  createStudentHomeworkValidation,
} = require("../../validators/homework/homework.joi");
const {
  currentBatchDetailMiddleWare,
} = require("../../Middlewares/batch.middleware");

const HomeworkRoutes = express.Router();

HomeworkRoutes.route("/assign-new-homework/:studentId").post(
  Authentication,
  Authorization(ADMIN),
  currentBatchDetailMiddleWare,
  createStudentHomeworkValidation,
  createStudentHomeworkController
);

module.exports = HomeworkRoutes;
