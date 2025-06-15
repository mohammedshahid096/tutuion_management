const { celebrate, Joi } = require("celebrate");

const createStudentHomeworkValidation = celebrate({
  body: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().optional().allow(""),
    deadline: Joi.date().optional(),
  }),
});

module.exports = {
  createStudentHomeworkValidation,
};
