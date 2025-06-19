const {
  TWILIO_PHONE_NUMBER,
  TWILIO_WEBHOOK_URL,
} = require("../Config/index.config");
const twilioClient = require("../Config/twilio.config");
const twilio = require("twilio");
const CallingAgentService = require("./callagent.service");
const logger = require("../Config/logger.config");

class TwilioService {
  constructor() {
    this.client = twilioClient;
    this.fromNumber = TWILIO_PHONE_NUMBER;
    this.baseUrl = `${TWILIO_WEBHOOK_URL}/api/v1/calling-agent`;
  }

  async makeCall(toNumber, twimlNextUrl) {
    try {
      logger.info(
        "Services - twilio.service -  TwilioService - makeCall - Start"
      );
      const call = await this.client.calls.create({
        to: toNumber,
        from: this.fromNumber,
        url: this.baseUrl + twimlNextUrl, // URL that returns TwiML instructions
      });
      logger.info(
        "Services - twilio.service -  TwilioService - makeCall - End"
      );
      return call;
    } catch (error) {
      logger.error(
        "Services - twilio.service -  TwilioService - makeCall - Error",
        error
      );
      throw new Error(`Twilio call failed: ${error.message}`);
    }
  }

  async voiceResponse() {
    try {
      logger.info(
        "Services - twilio.service -  TwilioService - voiceResponse - Start"
      );
      const VoiceResponse = twilio.twiml.VoiceResponse;
      const twiml = new VoiceResponse();
      const gather = twiml.gather({
        input: "speech",
        speechTimeout: "auto",
        action: `${this.baseUrl}/process-speech`,
        method: "POST",
      });
      gather.say(
        "Hello! This is your AI EduExcellence assistant. How can I help you today?"
      );

      logger.info(
        "Services - twilio.service -  TwilioService - voiceResponse - End"
      );

      return twiml.toString();
    } catch (error) {
      logger.error(
        "Services - twilio.service -  TwilioService - voiceResponse - End",
        error
      );

      throw new Error(`Twilio voiceResponse failed: ${error.message}`);
    }
  }

  async processSpeech(speechResult) {
    try {
      logger.info(
        "Services - twilio.service -  TwilioService - processSpeech - Start"
      );
      const VoiceResponse = twilio.twiml.VoiceResponse;
      const twiml = new VoiceResponse();

      console.log("message", speechResult);

      if (!speechResult || !speechResult.trim()) {
        twiml.say("Sorry, I didn't catch that. Please try again.");
        twiml.redirect(`${this.baseUrl}/voice`);
        logger.info(
          "Services - twilio.service -  TwilioService - processSpeech - No speech detected"
        );
        return twiml.toString();
      }

      // Here you can add logic to handle different speech inputs
      const callingAgentService = new CallingAgentService();
      let response = await callingAgentService.processRequest(speechResult);

      console.log(response.content);
      twiml.say(response.content);

      logger.info(
        "Services - twilio.service -  TwilioService - processSpeech - End"
      );
      return twiml.toString();
    } catch (error) {
      logger.error(
        "Services - twilio.service -  TwilioService - processSpeech - Error",
        error
      );
      throw new Error(`Twilio processSpeech failed: ${error.message}`);
    }
  }
}

module.exports = TwilioService;
