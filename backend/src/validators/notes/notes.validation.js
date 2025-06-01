const { celebrate, Joi } = require("celebrate");

const createNewNotesValidation = celebrate({
  body: Joi.object({
    noteName: Joi.string().trim().required().label("note name"),
    description: Joi.string().trim().required().label("description"),
  }),
});

module.exports = {
  createNewNotesValidation,
};
