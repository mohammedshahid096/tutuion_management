const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const AgentService = require("../../Services/agent.service");
const agentChatModel = require("../../Schema/agent-chat/agentChat.model");

const agentChatController = async (req, res, next) => {
  try {
    logger.info("Controller - agent.controller - agentChatController - start");

    const { message } = req.body;
    const agentService = new AgentService();
    const data = await agentService.processRequest(message);

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
    logger.info("Controller - agent.controller - agentChatController - end");
  } catch (error) {
    logger.error(
      "Controller - agent.controller - agentChatController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const createNewChatSession = async (req, res, next) => {
  try {
    logger.info("Controller - agent.controller - createNewChatSession - start");

    const userId = req?.user?._id || "672493276aa409505ecd9b43";

    const newSession = new agentChatModel({
      user: userId,
      createdBy: userId,
      updatedBy: userId,
    });
    await newSession.save();

    logger.info("Controller - agent.controller - createNewChatSession - End");
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "New chat session created successfully",
      sessionId: newSession._id,
      data: newSession,
    });
  } catch (error) {
    logger.error(
      "Controller - agent.controller - createNewChatSession - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};
module.exports = { agentChatController, createNewChatSession };
