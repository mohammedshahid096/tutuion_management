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

const RegisterController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-RegisterController-Start");

    const userServiceClass = new UserServiceClass();
    const userExist = await userServiceClass.getUserFindOne({
      email: req.body.email,
    });

    if (userExist) {
      return next(httpErrors.BadRequest(USER_CONSTANTS.USER_ALREADY_EXISTS));
    }

    await userServiceClass.createUserDocument(req.body);
    logger.info("Controller-user.controller-RegisterController-End");
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_CREATED,
    });
  } catch (error) {
    logger.error("Controller-user.controller-RegisterController-Error", error);
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

module.exports = {
  LoginUserController,
  RegisterController,
  MyProfileController,
};
