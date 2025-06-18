const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const AgentService = require("../../Services/agent.service");
const TwilioService = require("../../Services/twilio.service");
const agentChatModel = require("../../Schema/agent-chat/agentChat.model");
const httpError = require("http-errors");

const callInitialController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - call_agents.controller - callInitialController - Start"
    );

    const phoneNumber = "+919347222304";
    const twilioMlNextUrl = "/voice";

    const twilioService = new TwilioService();
    const callDetails = twilioService.makeCall(phoneNumber, twilioMlNextUrl);

    logger.info(
      "Controller - call_agents.controller - callInitialController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        success: true,
        statusCode: 200,
        message: "caller initiated successfully",
        callDetails,
      },
    });
  } catch (error) {
    logger.error(
      "Controller - call_agents.controller - callInitialController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const voiceCallAgentController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - call_agents.controller - voiceCallAgentController - start"
    );

    const twilioService = new TwilioService();
    const resultXml = await twilioService.voiceResponse();

    logger.info(
      "Controller - call_agents.controller - voiceCallAgentController - End"
    );
    res.type("text/xml").send(resultXml);
  } catch (error) {
    logger.error(
      "Controller -  call_agents.controller - voiceCallAgentController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const processSpeechAgentController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - call_agents.controller - processSpeechAgentController - Start"
    );

    const { speechResult } = req.body;
    const twilioService = new TwilioService();
    const resultXml = await twilioService.processSpeech(speechResult);

    logger.info(
      "Controller - call_agents.controller - processSpeechAgentController - End"
    );
    res.type("text/xml").send(resultXml);
  } catch (error) {
    logger.error(
      "Controller - call_agents.controller - processSpeechAgentController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  callInitialController,
  voiceCallAgentController,
  processSpeechAgentController,
};
