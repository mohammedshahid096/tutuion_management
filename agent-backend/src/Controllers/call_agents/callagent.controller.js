const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const AgentService = require("../../Services/agent.service");
const TwilioService = require("../../Services/twilio.service");
const agentChatModel = require("../../Schema/agent-chat/agentChat.model");
const httpError = require("http-errors");
const CallingAgentService = require("../../Services/callagent.service");
const callAgentChatModel = require("../../Schema/agent-chat/callagentChat.model");

const callInitialController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - call_agents.controller - callInitialController - Start"
    );

    const phoneNumber = "+919347222304";
    const twilioMlNextUrl = "/voice";

    const twilioService = new TwilioService();

    const callDetails = await twilioService.makeCall(
      phoneNumber,
      twilioMlNextUrl
    );

    let details = new callAgentChatModel({
      sid: callDetails.sid,
      to: callDetails.to,
      // callDetails:{},
      messages: [],
    });

    await details.save();

    logger.info(
      "Controller - call_agents.controller - callInitialController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "caller initiated successfully",
      data: details,
      callDetails,
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

    const { SpeechResult, CallSid } = req.body;

    // console.log(req.body);
    const twilioService = new TwilioService();
    const resultXml = await twilioService.processSpeech({
      speechResult: SpeechResult,
      sid: CallSid,
    });

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

const continueAiCallingAgentController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - call_agents.controller - continueAiCallingAgentController - start"
    );

    const twilioService = new TwilioService();
    const resultXml = await twilioService.continueResponse();

    logger.info(
      "Controller - call_agents.controller - continueAiCallingAgentController - End"
    );
    res.type("text/xml").send(resultXml);
  } catch (error) {
    logger.error(
      "Controller -  call_agents.controller - continueAiCallingAgentController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  callInitialController,
  voiceCallAgentController,
  processSpeechAgentController,
  continueAiCallingAgentController,
};
