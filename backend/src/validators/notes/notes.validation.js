const { celebrate, Joi } = require("celebrate");

const createNewNotesValidation = celebrate({
  body: Joi.object({
    noteName: Joi.string().trim().required().label("note name"),
    description: Joi.string().trim().required().label("description"),
  }),
});

const notesListValidation = celebrate({
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    search: Joi.string().trim().optional(),
  }),
});

module.exports = {
  createNewNotesValidation,
  notesListValidation,
};
