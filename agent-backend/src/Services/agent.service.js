const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { AgentExecutor, createToolCallingAgent } = require("langchain/agents");
const { getStudentInfoTool } = require("../tools/getStudentInfo.tool");
const logger = require("../Config/logger.config");

class AgentService {
  constructor({ maxOutputTokens = 500, temperature = 0.7 } = {}) {
    this.maxOutputTokens = maxOutputTokens;
    this.temperature = temperature;
    this.prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful assistant."],
      // ["placeholder", "{history}"],
      ["human", "{input}"],
      ["placeholder", "{agent_scratchpad}"],
    ]);

    this.googleModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: maxOutputTokens,
      temperature: temperature,
    });
  }

  async processRequest(input = "") {
    try {
      logger.info("Service - agent.service - processRequest - Start");
      const agent_tools = [getStudentInfoTool];

      const agent = createToolCallingAgent({
        llm: this.googleModel,
        tools: agent_tools,
        prompt: this.prompt,
      });

      const agentExecutor = new AgentExecutor({
        agent,
        tools: agent_tools,
        verbose: false,
      });

      const response = await agentExecutor.invoke({
        input,
      });

      logger.info("Service - agent.service - processRequest - End");
      return response;
    } catch (error) {
      logger.info("Service - agent.service - processRequest - Error", error);
      throw error;
    }
  }
}

module.exports = AgentService;
