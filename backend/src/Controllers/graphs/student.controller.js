const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const userModel = require("../../Schema/users/user.model");
const { ADMIN, STUDENT } = require("../../Constants/roles.constants");
const errorHandling = require("../../Utils/errorHandling");
const moment = require("moment");

const attendanceModel = require("../../Schema/attendance/attendance.model");

const studentDashboardGraphController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - graphs - student.controller - studentDashboardGraphController - Start"
    );

    const startDate = moment().subtract(1, "month").startOf("month").toDate();
    const endDate = moment().endOf("month").toDate();

    let attendanceGraphData = await attendanceModel
      .find({
        startDate: {
          $gte: startDate,
          $lte: endDate,
        },
        student: req?.query?.studentId ?? req.user?._id,
        batch: req.batch._id,
      })
      .select("startDate isPresent")
      .lean();

    res.status(200).send({
      success: true,
      statusCode: 200,
      data: {
        attendanceGraphData,
      },
    });

    logger.info(
      "Controller - graphs - student.controller - studentDashboardGraphController - End"
    );
  } catch (error) {
    logger.error(
      "Controller - graphs - student.controller - studentDashboardGraphController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  studentDashboardGraphController,
};
