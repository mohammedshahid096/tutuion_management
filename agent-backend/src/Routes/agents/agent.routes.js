const express = require("express");
const {
  agentChatController,
} = require("../../Controllers/agents/agent.controller");

const AgentRoutes = express.Router();
AgentRoutes.route("/chat-agent").post(agentChatController);

module.exports = AgentRoutes;
