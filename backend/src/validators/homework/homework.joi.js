const { celebrate, Joi } = require("celebrate");

const createStudentHomeworkValidation = celebrate({
  body: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().optional().allow(""),
    deadline: Joi.date().optional(),
  }),
});

const getHomeworkListValidation = celebrate({
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional(),
    page: Joi.number().integer().min(1).optional(),
    sort: Joi.string().valid("-createdAt", "+createdAt").optional(),
  }),
});

module.exports = {
  createStudentHomeworkValidation,
  getHomeworkListValidation,
};
