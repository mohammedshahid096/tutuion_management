const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const AgentService = require("../../Services/agent.service");

const agentChatController = async (req, res, next) => {
  try {
    logger.info("Controller - agent.controller - agentChatController - start");

    const agentService = new AgentService();
    const data = await agentService.processRequest(
      "i want the student details of this email test1@gmail.com"
    );

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
module.exports = { agentChatController };
