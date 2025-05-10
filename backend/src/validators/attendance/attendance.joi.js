const { celebrate, Joi } = require("celebrate");
// Validation for creating a new batch
const getAttendanceListValidation = celebrate({
  query: Joi.object({
    sort: Joi.string()
      .valid("-createdAt", "+createdAt")
      .optional()
      .label("Sort Order"),
    batch: Joi.string().optional().label("batchId"),
    limit: Joi.number().min(1).optional().label("Limit"),
    page: Joi.number().min(1).optional().label("Page"),
  }),
});
const getAttendanceDateWiseValidation = celebrate({
  query: Joi.object({
    date: Joi.date().optional().iso().label("date"),
  }),
});

module.exports = {
  getAttendanceListValidation,
  getAttendanceDateWiseValidation,
};
