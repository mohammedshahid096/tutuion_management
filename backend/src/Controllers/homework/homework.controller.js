const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const sortConstants = require("../../Constants/sort.constants");
const moment = require("moment");
const enrollmentProgressModel = require("../../Schema/enrollment-progress/enrollmentProgress.model");
const homeworkModel = require("../../Schema/homework/homework.schema");

const createStudentHomeworkController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - homework - homework.controller - createStudentHomeworkController - Start"
    );

    const { studentId } = req.params;
    const batchId = req.batch._id;

    let enrollmentDetails = await enrollmentProgressModel
      .findOne({
        studentId,
        batch: batchId,
      })
      .populate("studentId", "name class")
      .lean();

    if (!enrollmentDetails)
      return next(httpErrors.BadRequest("student enrollment is required!"));

    const details = {
      ...req.body,
      assignedBy: req.user._id,
      student: studentId,
      class: enrollmentDetails.studentId.class,
      batch: batchId,
      enrollment: enrollmentDetails._id,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    if (!details?.deadline) {
      details.deadline = moment().add(1, "day").toDate();
    }

    const newHomeworkDetails = new homeworkModel(details);
    await newHomeworkDetails.save();

    logger.info(
      "Controllers - homework - homework.controller - createStudentHomeworkController - End"
    );

    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "homework successfully created.",
      data: newHomeworkDetails,
    });
  } catch (error) {
    logger.error(
      "Controllers - homework - homework.controller - createStudentHomeworkController - End",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createStudentHomeworkController,
};
