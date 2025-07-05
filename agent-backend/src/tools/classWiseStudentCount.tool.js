const { DynamicStructuredTool } = require("@langchain/core/tools");
const { z } = require("zod");
const userModel = require("../Schema/users/user.model");
const { STUDENT } = require("../Constants/roles.constants");
const logger = require("../Config/logger.config");

const classWiseAnalyticsSchema = z.object({});

const classWiseStudentCountTool = new DynamicStructuredTool({
  name: "classWiseStudentCountTool",
  description: "Returns the number of students per class.",
  schema: classWiseAnalyticsSchema,
  func: async () => {
    try {
      logger.info(
        "Tools - classWiseStudentCount.tool - classWiseStudentCountTool - Start"
      );
      const classWiseStudentsGraphAggregation = [
        { $match: { role: STUDENT } },
        { $group: { _id: "$class", count: { $sum: 1 } } },
        { $project: { _id: 0, classRoom: "$_id", count: 1 } },
      ];
      const result = await userModel.aggregate(
        classWiseStudentsGraphAggregation
      );
      logger.info(
        "Tools - classWiseStudentCount.tool - classWiseStudentCountTool - End",
        result
      );
      return JSON.stringify(result);
    } catch (error) {
      return `Error fetching class-wise student count: ${error.message}`;
    }
  },
});

module.exports = {
  classWiseStudentCountTool,
};
