const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const attendanceModel = require("../../Schema/attendance/attendance.model");
const userModel = require("../../Schema/users/user.model");
const errorHandling = require("../../Utils/errorHandling");
const sortConstants = require("../../Constants/sort.constants");
const userConstants = require("../../Constants/user.constants");
const moment = require("moment");

const createNewLiveClassController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - attendance - attendance.controller - createNewLiveClassController - Start"
    );

    const { studentId } = req.params;
    let { summary, description } = req.body;

    let studentDetails = await userModel.findById(studentId).lean();

    if (!studentDetails) {
      return next(httpErrors.NotFound(userConstants.USER_NOT_FOUND));
    }
    const currentDay = moment().format("dddd").toLowerCase();
    const currentDate = moment().format("LLL");

    let studentAvailableOnThisDay = studentDetails?.days?.[currentDay] || false;

    if (!studentAvailableOnThisDay) {
      return next(
        httpErrors.BadRequest("Student is not available to create a live class")
      );
    }
    summary = summary ?? currentDay + " " + currentDate + "";
    description =
      description ??
      "A live is schedule " + currentDay + " " + currentDate + "";
    let startDate = moment(
      studentDetails?.timings?.startTimeHHMM,
      "HH:mm"
    ).utc();

    let endDate = moment(studentDetails?.timings?.endTimeHHMM, "HH:mm").utc();

    let details = {
      student: studentId,
      summary,
      description,
      startDate,
      endDate,
      day: currentDay,
      class: studentDetails?.class,
      board: studentDetails?.boardType.toString(),
      batch: req.batch._id.toString(),
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    const existingRecord = await attendanceModel.findOne({
      student: studentId,
      startDate: startDate,
    });

    if (existingRecord) {
      return next(
        httpErrors.Conflict(
          "Attendance already created for this student on this date."
        )
      );
    }

    const data = new attendanceModel(details);
    await data.save();

    logger.info(
      "Controllers - attendance - attendance.controller - createNewLiveClassController  - End"
    );
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "successfully new live class is created.",
      data,
    });
  } catch (error) {
    logger.error(
      "Controllers - attendance - attendance.controller - createNewLiveClassController -   - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createNewLiveClassController,
};
