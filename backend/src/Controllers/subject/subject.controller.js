const httpErrors = require("http-errors");
const SUBJECT_CONSTANTS = require("../../Constants/subject.constants");
const logger = require("../../Config/logger.config");
const subjectModel = require("../../Schema/subject/subject.model");
const errorHandling = require("../../Utils/errorHandling");
const sortConstants = require("../../Constants/sort.constants");

const createNewSubjectController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - subject - subject.controller - createNewSubjectController - Start"
    );

    let { name, description, code } = req.body;
    let details = {
      name,
      code,
      description: description ?? "this subject is about " + name,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };
    const existingSubject = await subjectModel.findOne({
      name: name.toLowerCase(),
    });
    if (existingSubject) {
      return next(
        httpErrors.BadRequest(SUBJECT_CONSTANTS.SUBJECT_ALREADY_EXISTS)
      );
    }

    const data = new subjectModel(details);
    await data.save();

    logger.info(
      "Controllers - subject - subject.controller - createNewSubjectController- End"
    );
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: SUBJECT_CONSTANTS.SUCCESSFULLY_SUBJECT_CREATED,
      data,
    });
  } catch (error) {
    logger.error(
      "Controllers - subject - subject.controller - createNewSubjectController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getSingleSubjectDetailController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - subject - subject.controller - getSingleSubjectDetailController - Start"
    );

    const { subjectID } = req.params;
    const subjectData = await subjectModel
      .findById(subjectID)
      .populate("createdBy updatedBy", "name")
      .lean();

    if (!subjectData) {
      return next(httpErrors.NotFound(SUBJECT_CONSTANTS.SUBJECT_NOT_FOUND));
    }

    logger.info(
      "Controllers - subject - subject.controller - getSingleSubjectDetailController - End"
    );
    res.status(200).send({
      success: true,
      statusCode: 200,
      message: SUBJECT_CONSTANTS.SUCCESSFULLY_SUBJECT_DETAILS_FETCHED,
      data: subjectData,
    });
  } catch (error) {
    logger.error(
      "Controllers - board - board.controller - getSingleSubjectDetailController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getSubjectsListController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - subject - subject.controller - getSubjectsListController - Start"
    );

    const { sort } = req.query;

    let sortQuery = sortConstants["-createdAt"];
    if (sort) {
      sortQuery = sortConstants[sort];
    }

    const subjectData = await subjectModel
      .find()
      .populate("createdBy updatedBy", "name")
      .sort(sortQuery)
      .lean();

    logger.info(
      "Controllers - subject - subject.controller - getSubjectsListController - End"
    );
    res.status(200).send({
      success: true,
      statusCode: 200,
      message: SUBJECT_CONSTANTS.SUCCESSFULLY_SUBJECT_LIST_FETCHED,
      data: subjectData,
    });
  } catch (error) {
    logger.error(
      "Controllers - subject - subject.controller - getSubjectsListController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const updateSubjectController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - subject - subject.controller - updateSubjectController - Start"
    );

    const { subjectID } = req.params;
    const { name, description, code } = req.body;

    let detailsToUpdate = {
      updatedBy: req.user._id,
    };

    if (name) detailsToUpdate.name = name;
    if (description) detailsToUpdate.description = description;
    if (code) detailsToUpdate.code = code;

    const subjectData = await subjectModel
      .findByIdAndUpdate(subjectID, { $set: detailsToUpdate }, { new: true })
      .populate("createdBy updatedBy", "name")
      .lean();

    if (!subjectData) {
      return next(httpErrors.NotFound(SUBJECT_CONSTANTS.SUBJECT_NOT_FOUND));
    }

    logger.info(
      "Controllers - subject - subject.controller - updateSubjectController - End"
    );
    res.status(200).send({
      success: true,
      statusCode: 200,
      message: SUBJECT_CONSTANTS.SUCCESSFULLY_SUBJECT_UPDATED,
      data: subjectData,
    });
  } catch (error) {
    logger.error(
      "Controllers - subject - subject.controller - updateSubjectController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const deleteSubjectController = async (req, res, next) => {
  try {
    logger.info(
      "Controllers - subject - subject.controller - deleteSubjectController - Start"
    );

    const { subjectID } = req.params;

    const subjectData = await subjectModel.findByIdAndDelete(subjectID);

    if (!subjectData) {
      return next(httpErrors.NotFound(SUBJECT_CONSTANTS.SUBJECT_NOT_FOUND));
    }

    logger.info(
      "Controllers - subject - subject.controller - deleteSubjectController - End"
    );
    res.status(200).send({
      success: true,
      statusCode: 200,
      message: SUBJECT_CONSTANTS.SUCCESSFULLY_SUBJECT_DELETED,
    });
  } catch (error) {
    logger.error(
      "Controllers - subject - subject.controller - deleteSubjectController - Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createNewSubjectController,
  getSingleSubjectDetailController,
  getSubjectsListController,
  updateSubjectController,
  deleteSubjectController,
};
