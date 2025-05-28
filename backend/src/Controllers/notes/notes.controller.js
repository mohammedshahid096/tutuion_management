const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const slugify = require("slugify");
const notesModel = require("../../Schema/notes/notes.schema");

const createNewNoteController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - notes.controller - createNewNoteController - Start"
    );

    const { noteName } = req.body;
    const slug = slugify(noteName, { lower: true, strict: true });
    const isSlugPresent = await notesModel({ slug });
    if (isSlugPresent) {
      return next(httpErrors.BadRequest("slug is already available"));
    }

    let details = {
      slug,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: details,
    });

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

module.exports = {
  createNewNoteController,
};
