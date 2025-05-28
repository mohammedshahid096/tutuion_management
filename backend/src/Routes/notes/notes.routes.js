const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  createNewNoteController,
} = require("../../Controllers/notes/notes.controller");
const {
  createNewNotesValidation,
} = require("../../validators/notes/notes.validation");

const AiRoutes = express.Router();

AiRoutes.route("/create-new-note").post(
  Authentication,
  Authorization(ADMIN),
  createNewNotesValidation,
  createNewNoteController
);

module.exports = AiRoutes;
