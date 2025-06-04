const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { AgentExecutor, createToolCallingAgent } = require("langchain/agents");
const { ChatMessageHistory } = require("langchain/memory");
const { RunnableWithMessageHistory } = require("@langchain/core/runnables");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const { getStudentInfoTool } = require("../tools/getStudentInfo.tool");
const logger = require("../Config/logger.config");

class AgentService {
  constructor({
    maxOutputTokens = 500,
    temperature = 0.7,
    sessionId = null,
    historyCount = 5,
  } = {}) {
    this.maxOutputTokens = maxOutputTokens;
    this.temperature = temperature;
    this.sessionId = sessionId;
    this.historyCount = historyCount;
    this.prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a helpful assistant, Name is EduExcellence Agent. Use tools when appropriate. Ask questions to get any missing required information.",
      ],
      ["placeholder", "{history}"],
      ["human", "{input}"],
      ["placeholder", "{agent_scratchpad}"],
    ]);

    this.googleModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: maxOutputTokens,
      temperature: temperature,
    });
  }

  async getMemoryFunction(history = []) {
    try {
      const chatHistory = new ChatMessageHistory();
      const historyCount = this.historyCount || 6; // Default to last 6 messages

      // Take only the last N messages
      const recentHistory = history.slice(-historyCount);

      // Convert raw history to proper message instances
      for (const message of recentHistory) {
        if (message.role === "user" || message.role === "human") {
          await chatHistory.addMessage(new HumanMessage(message.content));
        } else if (message.role === "ai" || message.role === "assistant") {
          await chatHistory.addMessage(new AIMessage(message.content));
        }
      }

      return chatHistory;
    } catch (error) {
      logger.error("Error creating message history:", error);
      return new ChatMessageHistory();
    }
  }

  async processRequest(input = "", sessionData = {}) {
    try {
      logger.info("Service - agent.service - processRequest - Start", input);
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

      const messageHistory = await this.getMemoryFunction(
        sessionData?.messages || []
      );

      const agentWithHistory = new RunnableWithMessageHistory({
        runnable: agentExecutor,
        getMessageHistory: () => messageHistory,
        inputMessagesKey: "input",
        historyMessagesKey: "history",
      });

      const response = await agentWithHistory.invoke(
        {
          input,
        },
        { configurable: { sessionId: this.sessionId } }
      );

      logger.info("Service - agent.service - processRequest - End");
      return response;
    } catch (error) {
      logger.info("Service - agent.service - processRequest - Error", error);
      throw error;
    }
  }
}

module.exports = AgentService;
