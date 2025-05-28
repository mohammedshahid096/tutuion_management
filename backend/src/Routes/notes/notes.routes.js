const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  createNewNoteController,
  getNotesDetailsController,
} = require("../../Controllers/notes/notes.controller");
const {
  createNewNotesValidation,
} = require("../../validators/notes/notes.validation");

const NoteRoutes = express.Router();

NoteRoutes.route("/create-new-note").post(
  Authentication,
  Authorization(ADMIN),
  createNewNotesValidation,
  createNewNoteController
);

NoteRoutes.route("/:slug").get(getNotesDetailsController);

module.exports = NoteRoutes;
