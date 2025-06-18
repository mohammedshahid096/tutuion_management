const {
  TWILIO_PHONE_NUMBER,
  TWILIO_WEBHOOK_URL,
} = require("../Config/index.config");
const twilioClient = require("../Config/twilio.config");
const twilio = require("twilio");

class TwilioService {
  constructor({ baseUrl = "" }) {
    this.client = twilioClient;
    this.fromNumber = TWILIO_PHONE_NUMBER;
    this.baseUrl = `${TWILIO_WEBHOOK_URL}/api/v1/calling-agent`;
  }

  async makeCall(toNumber, twimlNextUrl) {
    try {
      const call = await this.client.calls.create({
        to: toNumber,
        from: this.fromNumber,
        url: this.baseUrl + twimlNextUrl, // URL that returns TwiML instructions
      });
      return call;
    } catch (error) {
      throw new Error(`Twilio call failed: ${error.message}`);
    }
  }

  async voiceResponse() {
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      input: "speech",
      speechTimeout: "auto",
      action: `${this.baseUrl}/process-speech`,
      method: "POST",
    });
    gather.say(
      "Hello! This is your AI EduExcellence assistant. How can I help you today? Please speak after the beep."
    );

    return twiml.toString();
  }

  async processSpeech(speechResult) {
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const twiml = new VoiceResponse();

    console.log("message", speechResult);

    if (!speechResult || !speechResult.trim()) {
      twiml.say("Sorry, I didn't catch that. Please try again.");
      twiml.redirect(`${this.baseUrl}/voice`);
      return twiml.toString();
    }

    // Here you can add logic to handle different speech inputs
    twiml.say(`You said: ${speechResult}. Thank you for your response.`);
    // twiml.hangup();

    return twiml.toString();
  }
}

module.exports = TwilioService;
