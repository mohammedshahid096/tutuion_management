const express = require("express");
const {
  RegisterStudentController,
  LoginUserController,
  MyProfileController,
  GetStudentsController,
} = require("../../Controllers/users/user.controller");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const {
  RegisterStudentValidation,
  LoginUserValidation,
} = require("../../validators/users/user.joi");
const { ADMIN } = require("../../Constants/roles.constants");

const UserRoutes = express.Router();

UserRoutes.route("/login").post(LoginUserValidation, LoginUserController);
UserRoutes.route("/register").post(
  Authentication,
  Authorization(ADMIN),
  RegisterStudentValidation,
  RegisterStudentController
);

UserRoutes.route("/profile").get(Authentication, MyProfileController);

// students routes
UserRoutes.route("/students").get(
  Authentication,
  Authorization(ADMIN),
  GetStudentsController
);

module.exports = UserRoutes;
