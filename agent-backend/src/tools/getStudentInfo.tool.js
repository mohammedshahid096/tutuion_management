const { DynamicStructuredTool } = require("@langchain/core/tools");
const { z } = require("zod");
const userModel = require("../Schema/users/user.model");
const { STUDENT } = require("../Constants/roles.constants");
const logger = require("../Config/logger.config");

const getStudentInfoSchema = z.object({
  email: z.string().describe("The student's valid email address"),
});

const getStudentInfoTool = new DynamicStructuredTool({
  name: "getStudentInfoTool",
  description: "Retrieves student information. REQUIRES: email",
  schema: getStudentInfoSchema,
  func: async ({ email }) => {
    try {
      logger.info("Tools - getStudentInfo.tool - getStudentInfoTool - Start");
      let studentDetails = await userModel
        .findOne({ email, role: STUDENT })
        // .select("-google -password -createdBy -updatedBy")
        .lean();
      if (!studentDetails) return "student not found with given email";
      logger.info("Tools - getStudentInfo.tool - getStudentInfoTool - End");
      return studentDetails;
    } catch (error) {
      logger.info(
        "Tools - getStudentInfo.tool - getStudentInfoTool - Error",
        error
      );
      return error.message || "something went wrong";
    }
  },
});

module.exports = {
  getStudentInfoTool,
};
