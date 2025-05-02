const httpErrors = require("http-errors");
const USER_CONSTANTS = require("../../Constants/user.constants");
const logger = require("../../Config/logger.config");
const { VerifyPasswordMethod } = require("../../Utils/verify.password");
const { CreateAccessToken } = require("../../Utils/jwt.token");
const userModel = require("../../Schema/users/user.model");
const { ADMIN, STUDENT } = require("../../Constants/roles.constants");
const errorHandling = require("../../Utils/errorHandling");
const { decryptPasswordFunction } = require("../../Utils/encryption");
const { StrongPasswordValidation } = require("../../validators/users/user.joi");
const moment = require("moment");
const sortConstants = require("../../Constants/sort.constants");
const NodeMailerServiceClass = require("../../aws_ses/mails/mail.index");

const LoginUserController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-LoginUserController-Start");
    const {
      password: { iv, ciphertext },
      email,
    } = req.body;

    const userExist = await userModel
      .findOne({ email })
      .select("+password -google")
      .lean();

    if (!userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    let decryptPassword = decryptPasswordFunction({
      iv,
      ciphertext,
    });

    let isStrongPasswordError = StrongPasswordValidation({
      password: decryptPassword,
    });

    // Check if the password is strong
    if (isStrongPasswordError)
      return next(httpErrors.BadRequest(isStrongPasswordError));

    // Check if the password is strong
    const isPasswordMatch = await VerifyPasswordMethod(
      decryptPassword,
      userExist.password
    );

    if (!isPasswordMatch)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    delete userExist.password;
    const token = await CreateAccessToken(userExist._id, userExist.role);

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_LOGIN,
      accessToken: token,
      data: userExist,
    });
  } catch (error) {
    logger.error("Controller-user.controller-LoginUserController-Error", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

const RegisterStudentController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-RegisterController-Start");

    const { email } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return next(httpErrors.BadRequest(USER_CONSTANTS.USER_ALREADY_EXISTS));
    }

    let details = {
      name: req.body.name,
      email,
      password: req.body.password,
      gender: req.body.gender,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      phone: req.body.phone,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth,
      class: req.body.classRoom,
      school: req.body.school,
      boardType: req.body.boardType,
      role: STUDENT,
      timings: {
        start: req.body.timings.start,
        startTimeHHMM: moment(req.body.timings.start).format("HH:mm"),
        end: moment(req.body.timings.start).add(1, "hours"),
        endTimeHHMM: moment(req.body.timings.start)
          .add(1, "hours")
          .format("HH:mm"),
      },
      days: req.body.days,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    // const newStart = moment.utc(details.timings.start);
    // const newEnd = moment.utc(details.timings.end);

    // const isTimingsAvailable = await userModel
    //   .findOne({
    //     "timings.start": { $lt: newEnd.toDate() },
    //     "timings.end": { $gt: newStart.toDate() },
    //   })
    //   .lean();

    // console.log("shahid", isTimingsAvailable);

    // let isTimingsAvailable = await userModel
    //   .findOne({ "timings.startTimeHHMM": details.timings.startTimeHHMM })
    //   .lean();

    // if (isTimingsAvailable) {
    //   return next(httpErrors.BadRequest(USER_CONSTANTS.TIMINGS_ALREADY_BOOKED));
    // }

    let studentDetails = new userModel(details);
    await studentDetails.save();

    let mailDetails = {
      student_name: details.name,
      student_email: details.email,
      student_password: details.password,
    };

    const nodeMailerService = new NodeMailerServiceClass();
    await nodeMailerService.sendMail(
      details.email,
      "welcomeStudentRegistrationTemplate",
      null,
      mailDetails
    );

    logger.info("Controller-user.controller-RegisterController-End");
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_CREATED,
      data: studentDetails,
    });
  } catch (error) {
    logger.error("Controller-user.controller-RegisterController-Error", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

const singleStudentDetailsController = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    let data = await userModel
      .findById(studentId)
      .select("-google")
      .populate("boardType createdBy updatedBy", "name")
      .lean();

    if (!data) {
      return next(httpErrors.NotFound());
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    logger.warn("Controller-user.controller-RegisterController-End", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

const MyProfileController = async (req, res, next) => {
  try {
    let data = await userModel.findById(req.user._id).select("-google");

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    logger.warn("Controller-user.controller-RegisterController-End", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

const GetStudentsController = async (req, res, next) => {
  try {
    logger.info("Controller - user.controller - GetStudentsController - Start");

    let { limit = 15, page = 1, sort = "-createdAt" } = req.query;
    const {
      name = null,
      classRoom = null,
      boardType = null,
      gender = null,
    } = req.query;

    limit = Number(limit);
    page = Number(page);

    const skip_docs = (page - 1) * limit;

    const totalDocs = await userModel.countDocuments({ role: STUDENT });
    const totalPages = Math.ceil(totalDocs / limit);

    const query = {
      role: STUDENT,
    };
    if (name) query.name = name;
    if (classRoom) query.class = classRoom;
    if (boardType) query.boardType = boardType;
    if (gender) query.gender = gender;

    const docs = await userModel
      .find(query)
      .skip(skip_docs)
      .limit(limit)
      .select("-password -google")
      .sort(sortConstants[sort] || sortConstants["-createdAt"]);

    const hasNext = totalDocs > skip_docs + limit;
    const hasPrev = page > 1;

    const data = {
      totalDocs,
      totalPages,
      docs,
      currentPage: page,
      hasNext,
      hasPrev,
      limit,
    };

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: USER_CONSTANTS.SUCCESSFULLY_FETCHED_STUDENTS,
      data,
    });

    logger.info("Controller-user.controller-GetStudentsController-End");
  } catch (error) {
    logger.error(
      "Controller-user.controller-GetStudentsController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  LoginUserController,
  RegisterStudentController,
  GetStudentsController,
  MyProfileController,
  singleStudentDetailsController,
};
