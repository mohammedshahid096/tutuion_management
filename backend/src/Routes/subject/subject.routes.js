const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const {
  createNewSubjectController,
  getSingleSubjectDetailController,
  getSubjectsListController,
  updateSubjectController,
  deleteSubjectController,
} = require("../../Controllers/subject/subject.controller");
const {
  createSubjectValidation,
  listSubjectsValidation,
  updateSubjectValidation,
} = require("../../validators/subjects/subject.joi");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  currentBatchDetailMiddleWare,
} = require("../../Middlewares/batch.middleware");

const SubjectRoutes = express.Router();

SubjectRoutes.route("/new-subject").post(
  Authentication,
  Authorization(ADMIN),
  createSubjectValidation,
  currentBatchDetailMiddleWare,
  createNewSubjectController
);

SubjectRoutes.route("/list").get(
  // Authentication,
  // Authorization(ADMIN),
  listSubjectsValidation,
  getSubjectsListController
);

SubjectRoutes.route("/:subjectID")
  .get(getSingleSubjectDetailController)
  .put(
    Authentication,
    Authorization(ADMIN),
    updateSubjectValidation,
    updateSubjectController
  )
  .delete(Authentication, Authorization(ADMIN), deleteSubjectController);

SubjectRoutes.route("/");

module.exports = SubjectRoutes;
