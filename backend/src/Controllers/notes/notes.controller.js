const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const errorHandling = require("../../Utils/errorHandling");
const slugify = require("slugify");
const notesModel = require("../../Schema/notes/notes.schema");
const templateJsonData = require("./templates.json");
const { v4: uuidV4 } = require("uuid");

const createNewNoteController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - notes.controller - createNewNoteController - Start"
    );

    const { noteName } = req.body;
    const slug = slugify(noteName, { lower: true, strict: true });
    const isSlugPresent = await notesModel.findOne({ slug });
    if (isSlugPresent) {
      return next(httpErrors.BadRequest("slug is already available"));
    }

    let templateSections = templateJsonData?.[
      "template_1"
    ]?.templateSections?.map((section) => {
      return {
        ...section,
        uuid: uuidV4(),
        block: section?.block?.map((singleBlock) => {
          return {
            ...singleBlock,
            uuid: uuidV4(),
            subBlock: singleBlock?.subBlock?.map((singleSubBlock) => ({
              ...singleSubBlock,
              uuid: uuidV4(),
            })),
          };
        }),
      };
    });

    let details = {
      slug,
      templateSections,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    const newDetails = new notesModel(details);
    await newDetails.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "successfully new notes is created",
      data: newDetails,
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

const getNotesDetailsController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - notes.controller - getNotesDetailsController - Start"
    );

    const { slug } = req.params;

    const note = await notesModel.findOne({ slug });
    if (!note) {
      return next(httpErrors.NotFound("Note not found"));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successfully notes details is fetched",
      data: note,
    });

    logger.info(
      "Controller - notes.controller - getNotesDetailsController - End"
    );
  } catch (error) {
    logger.error(
      "Controller - notes.controller - getNotesDetailsController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createNewNoteController,
  getNotesDetailsController,
};
