const express = require("express");
const {
  voiceCallAgentController,
  callInitialController,
  processSpeechAgentController,
  testAiCallingAgentController,
} = require("../../Controllers/call_agents/callagent.controller");

const CallAgentRoutes = express.Router();

CallAgentRoutes.route("/make-call").get(callInitialController);
CallAgentRoutes.route("/voice").post(voiceCallAgentController);
CallAgentRoutes.route("/process-speech").post(processSpeechAgentController);
// CallAgentRoutes.route("/test").get(testAiCallingAgentController);

module.exports = CallAgentRoutes;
