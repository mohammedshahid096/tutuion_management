const { celebrate, Joi } = require("celebrate");

// Validation for creating a new subject
const addNewEnrollmentValidations = celebrate({
  body: Joi.object({
    batch: Joi.string().required().label("Batch"),
    studentId: Joi.string().required().label("Student Id"),
    subjects: Joi.array()
      .items(Joi.string())
      .min(1)
      .required()
      .label("Subjects"),
  }),
});

module.exports = {
  addNewEnrollmentValidations,
};
