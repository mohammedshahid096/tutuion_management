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

const SubjectRoutes = express.Router();

SubjectRoutes.route("/new-subject").post(
  Authentication,
  Authorization(ADMIN),
  createSubjectValidation,
  createNewSubjectController
);

SubjectRoutes.route("/list").get(
  Authentication,
  Authorization(ADMIN),
  listSubjectsValidation,
  getSubjectsListController
);

SubjectRoutes.route("/:subjectID")
  .get(Authentication, Authorization(ADMIN), getSingleSubjectDetailController)
  .put(
    Authentication,
    Authorization(ADMIN),
    updateSubjectValidation,
    updateSubjectController
  )
  .delete(Authentication, Authorization(ADMIN), deleteSubjectController);

module.exports = SubjectRoutes;
