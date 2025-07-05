const { DynamicStructuredTool } = require("@langchain/core/tools");
const { z } = require("zod");
const userModel = require("../Schema/users/user.model");
const { STUDENT } = require("../Constants/roles.constants");
const logger = require("../Config/logger.config");

const genderAnalyticsSchema = z.object({});

const genderDistributionTool = new DynamicStructuredTool({
  name: "genderDistributionTool",
  description: "Returns the gender distribution or report of  students.",
  schema: genderAnalyticsSchema,
  func: async () => {
    try {
      logger.info(
        "Tools - genderDistribution.tool - genderDistributionTool - Start"
      );
      const genderGraphAggregation = [
        { $match: { role: STUDENT } },
        { $group: { _id: "$gender", count: { $sum: 1 } } },
        { $project: { _id: 0, gender: "$_id", count: 1 } },
      ];
      const result = await userModel.aggregate(genderGraphAggregation);
      logger.info(
        "Tools - genderDistribution.tool - genderDistributionTool - End",
        result
      );
      return JSON.stringify(result);
    } catch (error) {
      logger.error(
        "Tools - genderDistribution.tool - genderDistributionTool - Error",
        error
      );
      return `Error fetching gender distribution: ${error.message}`;
    }
  },
});

module.exports = {
  genderDistributionTool,
};
