const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");

const { ADMIN } = require("../../Constants/roles.constants");
const {
  addNewEnrollmentValidations,
} = require("../../validators/enrollment-progress/enrollment_progress.validation");
const {
  createNewEnrollmentController,
  getAllSingleStudentEnrollmentController,
} = require("../../Controllers/enrollment-progress/Enrollment.controller");

const EnrollmentRoutes = express.Router();

EnrollmentRoutes.route("/new-enrollment").post(
  Authentication,
  Authorization(ADMIN),
  addNewEnrollmentValidations,
  createNewEnrollmentController
);

EnrollmentRoutes.route("/:studentId/enrollments").get(
  Authentication,
  Authorization(ADMIN),
  getAllSingleStudentEnrollmentController
);

module.exports = EnrollmentRoutes;
