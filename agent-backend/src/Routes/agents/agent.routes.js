const express = require("express");
const {
  agentChatController,
  createNewChatSession,
} = require("../../Controllers/agents/agent.controller");

const AgentRoutes = express.Router();
AgentRoutes.route("/:sessionId/chat-agent").post(agentChatController);
AgentRoutes.route("/chat-agent/new-session").get(createNewChatSession);

module.exports = AgentRoutes;
