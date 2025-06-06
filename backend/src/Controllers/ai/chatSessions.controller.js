const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const agentChatModel = require("../../Schema/agent-chat/agentChat.model");
const httpError = require("http-errors");

const getSessionDetailsController = async (req, res, next) => {
  try {
    logger.info("Controller - ai.controller - getSessionDetails - start");

    const { sessionId } = req.params;
    const sessionData = await agentChatModel.findById(sessionId);

    if (!sessionData) {
      return next(httpError(404, "Session not found"));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: sessionData,
    });

    logger.info("Controller - ai.controller - getSessionDetails - end");
  } catch (error) {
    logger.error(
      "Controller - ai.controller - getSessionDetails - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  getSessionDetailsController,
};
