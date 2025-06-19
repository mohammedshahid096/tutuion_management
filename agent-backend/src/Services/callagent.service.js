const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const logger = require("../Config/logger.config");

class CallingAgentService {
  constructor({ maxOutputTokens = 500, temperature = 0.7 } = {}) {
    this.maxOutputTokens = maxOutputTokens;
    this.temperature = temperature;
    this.prompt = null;

    this.googleModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: maxOutputTokens,
      temperature: temperature,
    });
  }

  async processRequest(userMessage) {
    try {
      logger.info(
        "Service - callagent.service - processRequest - Start",
        userMessage
      );
      // Update the prompt to indicate this is a calling agent interaction
      this.prompt = ChatPromptTemplate.fromMessages([
        [
          "system",
          "You are EduExcellence Calling Agent, a professional AI assistant specialized in handling phone calls and customer service. " +
            "Respond concisely and professionally as if you're on a phone call. " +
            "Keep responses clear and to the point, suitable for phone conversation.",
        ],
        ["human", "{input}"],
      ]);

      const chain = this.prompt.pipe(this.googleModel);

      const response = await chain.invoke({
        input: userMessage,
      });

      logger.info("Service - callagent.service - processRequest - End");
      return response;
    } catch (error) {
      logger.error(
        "Service - callagent.service - processRequest - Error",
        error
      );
      throw new Error("Failed to process the request. Please try again.");
    }
  }
}

module.exports = CallingAgentService;
