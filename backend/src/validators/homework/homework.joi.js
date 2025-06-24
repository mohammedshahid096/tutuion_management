const { celebrate, Joi } = require("celebrate");

const createStudentHomeworkValidation = celebrate({
  body: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().optional().allow(""),
    deadline: Joi.date().iso().optional().label("Date should be YYYY-MM-DD"),
  }),
});

const getHomeworkListValidation = celebrate({
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional(),
    page: Joi.number().integer().min(1).optional(),
    sort: Joi.string().valid("-createdAt", "+createdAt").optional(),
    student: Joi.string().optional(),
  }),
});

module.exports = {
  createStudentHomeworkValidation,
  getHomeworkListValidation,
};
