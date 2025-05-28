const { celebrate, Joi } = require("celebrate");

const createNewNotesValidation = celebrate({
  body: Joi.object({
    noteName: Joi.string().trim().required().label("note name"),
  }),
});

module.exports = {
  createNewNotesValidation,
};
