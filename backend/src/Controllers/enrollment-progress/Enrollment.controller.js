const httpErrors = require("http-errors");
const SUBJECT_CONSTANTS = require("../../Constants/subject.constants");
const logger = require("../../Config/logger.config");
const subjectModel = require("../../Schema/subject/subject.model");
const userModel = require("../../Schema/users/user.model");
const enrollmentProgressModel = require("../../Schema/enrollment-progress/enrollmentProgress.model");
const errorHandling = require("../../Utils/errorHandling");
const sortConstants = require("../../Constants/sort.constants");

const createNewEnrollmentController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - enrollmentProgress - enrollmentProgress.controller - createNewEnrollmentProgressController - Start"
    );
    const { batch, subjects, studentId } = req.body;

    const studentDetails = await userModel.findById(studentId);

    let filterSubjects = subjects?.map((singleSubject) => ({
      _id: singleSubject,
      class: studentDetails?.class,
      boardType: studentDetails?.boardType,
      batch,
    }));
    const subjectDetails = await subjectModel
      .find({ $or: filterSubjects })
      .lean();

    let details = {
      studentId: studentDetails?._id.toString(),
      batch: batch,
      class: studentDetails?.class,
      board: studentDetails?.boardType,
      subjects: subjectDetails?.map((item) => ({
        subjectId: item._id.toString(),
        chapters: [],
      })),
      createdBy: req.user._id,
      updatedBy: req.user._id,
      order: 1,
    };

    const newEnrollment = new enrollmentProgressModel(details);
    await newEnrollment.save();

    logger.info(
      "Controllers - enrollmentProgress - enrollmentProgress.controller - createNewEnrollmentProgressController  - End"
    );
    res.status(201).send({
      success: true,
      statusCode: 201,
      data: newEnrollment,
    });
  } catch (error) {
    logger.error(
      "Controllers - enrollmentProgress - enrollmentProgress.controller - createNewEnrollmentProgressController  - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getAllSingleStudentEnrollmentController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - enrollmentProgress - enrollmentProgress.controller - getAllSingleStudentEnrollmentController - Start"
    );
    const { studentId } = req.params;

    let enrollments = await enrollmentProgressModel
      .find({ studentId })
      .populate("batch board subjects.subjectId", "name");

    logger.info(
      "Controllers - enrollmentProgress - enrollmentProgress.controller - getAllSingleStudentEnrollmentController  - End"
    );
    res.status(200).send({
      success: true,
      statusCode: 200,
      message: "enrollments list",
      data: enrollments,
    });
  } catch (error) {
    logger.error(
      "Controllers - enrollmentProgress - enrollmentProgress.controller - getAllSingleStudentEnrollmentController  - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createNewEnrollmentController,
  getAllSingleStudentEnrollmentController,
};
