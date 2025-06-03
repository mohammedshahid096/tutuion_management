const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");

const agentChatController = async (req, res, next) => {
  try {
    logger.info("Controller - agent.controller - agentChatController - start");

    res.status(200).json({
      success: true,
      statusCode: 200,
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
module.exports = { agentChatController };
