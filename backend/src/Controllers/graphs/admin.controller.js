const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const userModel = require("../../Schema/users/user.model");
const { ADMIN, STUDENT } = require("../../Constants/roles.constants");
const errorHandling = require("../../Utils/errorHandling");
const moment = require("moment");

const adminDashboardGraphController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - graph.controller - AdminDashboardGraphController - Start"
    );
    const genderGraphAggregation = [
      { $match: { role: STUDENT } },
      { $group: { _id: "$gender", count: { $sum: 1 } } },
      { $project: { _id: 0, gender: "$_id", count: 1 } },
    ];

    let genderGraphData = await userModel.aggregate(genderGraphAggregation);
    logger.info(
      "Controller - graph.controller - AdminDashboardGraphController - Start"
    );

    res.status(200).send({
      success: true,
      statusCode: 200,
      data: { genderGraphData },
    });
  } catch (error) {
    logger.error("Controller-user.controller-LoginUserController-Error", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  adminDashboardGraphController,
};
