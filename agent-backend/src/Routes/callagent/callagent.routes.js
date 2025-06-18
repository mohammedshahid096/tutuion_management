const express = require("express");
const {
  voiceCallAgentController,
  callInitialController,
  processSpeechAgentController,
} = require("../../Controllers/call_agents/callagent.controller");

const CallAgentRoutes = express.Router();

CallAgentRoutes.route("/make-call").get(callInitialController);
CallAgentRoutes.route("/voice").post(voiceCallAgentController);
CallAgentRoutes.route("/process-speech").post(processSpeechAgentController);

module.exports = CallAgentRoutes;
