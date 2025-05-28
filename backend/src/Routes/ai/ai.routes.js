const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN } = require("../../Constants/roles.constants");
const {
  builderTextAiController,
} = require("../../Controllers/ai/builderAi.controller");
const {
  textBuilderAiPromptValidation,
} = require("../../validators/ai/ai.validation");

const AiRoutes = express.Router();

AiRoutes.route("/builder/text").post(
  Authentication,
  Authorization(ADMIN),
  textBuilderAiPromptValidation,
  builderTextAiController
);

module.exports = AiRoutes;
