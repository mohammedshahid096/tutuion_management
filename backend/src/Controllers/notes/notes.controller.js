const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const axios = require("axios");
const { OPEN_ROUTER_API_KEY } = require("../../Config/index.config");

const createNewNoteController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - notes.controller - createNewNoteController - Start"
    );

    logger.info(
      "Controller - notes.controller - createNewNoteController - End"
    );
  } catch (error) {
    logger.error(
      "Controller - notes.controller - createNewNoteController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {};
