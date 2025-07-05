const { DynamicStructuredTool } = require("@langchain/core/tools");
const { z } = require("zod");
const userModel = require("../Schema/users/user.model");
const { STUDENT } = require("../Constants/roles.constants");
const logger = require("../Config/logger.config");
const { boards } = require("../Constants/model.constants");

const boardWiseAnalyticsSchema = z.object({});

const boardWiseStudentCountTool = new DynamicStructuredTool({
  name: "boardWiseStudentCountTool",
  description: "Returns the number of students per board (e.g., CBSE, ICSE).",
  schema: boardWiseAnalyticsSchema,
  func: async () => {
    logger.info(
      "Tools - boardWiseStudentCount.tool - boardWiseStudentCountTool - Start"
    );
    try {
      const boardWiseStudentsGraphAggregation = [
        { $match: { role: STUDENT } },
        { $group: { _id: "$boardType", count: { $sum: 1 } } },
        {
          $lookup: {
            from: boards,
            localField: "_id",
            foreignField: "_id",
            as: "board",
          },
        },
        {
          $project: {
            _id: 1,
            boardName: { $arrayElemAt: ["$board.name", 0] },
            count: 1,
          },
        },
      ];
      const result = await userModel.aggregate(
        boardWiseStudentsGraphAggregation
      );
      logger.info(
        "Tools - boardWiseStudentCount.tool - boardWiseStudentCountTool - End",
        result
      );
      return JSON.stringify(result);
    } catch (error) {
      logger.error(
        "Tools - boardWiseStudentCount.tool - boardWiseStudentCountTool - Error",
        error
      );
      return `Error fetching board-wise student count: ${error.message}`;
    }
  },
});

module.exports = {
  boardWiseStudentCountTool,
};
