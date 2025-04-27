const httpErrors = require("http-errors");
const { VerifyAccessToken } = require("../Utils/jwt.token");
const logger = require("../Config/logger.config");
const { USER_NOT_FOUND } = require("../Constants/user.constants");
const {
  AUTHENTICATION_TOKEN_REQUIRED,
  AUTHORIZATION_REQUIRED,
} = require("../Constants/auth.constants");
const { ADMIN } = require("../Constants/roles.constants");
const errorHandling = require("../Utils/errorHandling");
const { DEVELOPMENT_MODE } = require("../Config/index.config");
const userModel = require("../Schema/users/user.model");
// for authentication
module.exports.Authentication = async (req, res, next) => {
  try {
    let authHeader = req.header("Authorization");
    if (DEVELOPMENT_MODE === "development" && req?.authToken) {
      authHeader = req.authToken;
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized(AUTHENTICATION_TOKEN_REQUIRED));
    }

    const token = authHeader.split(" ")[1];
    const decode = await VerifyAccessToken(token);
    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    let userExist = null;
    userExist = await userModel.findById(decode.id).lean();
    if (!userExist) {
      return next(httpErrors.NotFound(USER_NOT_FOUND));
    }
    req.user = userExist;
    req.__type__ = userExist?.role;
    logger.info(
      `req Email : ${userExist?.email || userExist?.name} role:${
        userExist.role
      }`
    );
    next();
  } catch (error) {
    errorHandling.handleCustomErrorService(error, next);
  }
};

// authorization depending  upon a role
module.exports.Authorization = (...roles) => {
  return (req, res, next) => {
    const userRole = req.__type__;
    if (!roles.includes(userRole)) {
      return next(httpErrors.Unauthorized(AUTHORIZATION_REQUIRED));
    }
    next();
  };
};

// setting headers for the development purpose
module.exports.setHeaderDevelopment = (req, res, next) => {
  let token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UxOTI0NGY2MzBjYTc0M2M3YWJkMCIsIl9fdHlwZV9fIjoiYWRtaW4iLCJpYXQiOjE3NDU1OTA2ODMsImV4cCI6MTc0NTg0OTg4M30.yOpwBdpgSJoQvGektVcb4FeUEVQ6xuQJj2pIRF2e5Ms";

  req.authToken = token;
  next();
};
