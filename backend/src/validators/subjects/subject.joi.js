const { celebrate, Joi } = require("celebrate");

// Validation for creating a new subject
const createSubjectValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(50).label("Subject Name"),
    code: Joi.string().required().min(2).max(10).label("Subject Code"),
    description: Joi.string().max(500).optional().label("Description"),
  }),
});

// Validation for updating a subject
const updateSubjectValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(50).optional().label("Subject Name"),
    code: Joi.string().min(2).max(10).optional().label("Subject Code"),
    description: Joi.string().max(500).optional().label("Description"),
  }),
});

// Validation for listing subjects with pagination
const listSubjectsValidation = celebrate({
  query: Joi.object({
    sort: Joi.string()
      .valid("-createdAt", "+createdAt")
      .optional()
      .label("Sort Order"),
  }),
});

module.exports = {
  createSubjectValidation,
  updateSubjectValidation,
  listSubjectsValidation,
};
