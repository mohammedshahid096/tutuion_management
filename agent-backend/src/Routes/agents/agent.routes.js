const express = require("express");
const {
  agentChatController,
} = require("../../Controllers/agents/agent.controller");

const AgentRoutes = express.Router();
AgentRoutes.route("/chat-agent").get(agentChatController);

module.exports = AgentRoutes;
