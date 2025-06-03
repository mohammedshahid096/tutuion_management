const express = require("express");
const AgentRoutes = require("./agents/agent.routes");

// Route config
const IndexRoutes = express.Router();

// ----------------------------------------
//  agent  routes
// ----------------------------------------
IndexRoutes.use("/agent", AgentRoutes);

// export the routes
module.exports = IndexRoutes;
