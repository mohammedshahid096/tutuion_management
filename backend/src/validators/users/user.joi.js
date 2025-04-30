const { celebrate, Joi } = require("celebrate");
const passwordComplexity = require("joi-password-complexity");

// register schema
const RegisterStudentValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    gender: Joi.string()
      .valid("male", "female", "other")
      .required()
      .label("Gender"),
    fatherName: Joi.string().required().label("Father's Name"),
    motherName: Joi.string().required().label("Mother's Name"),
    phone: Joi.string().required().label("Phone"),
    address: Joi.string().required().label("Address"),
    dateOfBirth: Joi.date().required().label("Date of Birth"),
    classRoom: Joi.number().min(1).max(12).required().label("Class"),
    school: Joi.string().required().label("School"),
    boardType: Joi.string().required().label("Board Type"),
    timings: Joi.object({
      start: Joi.date().required().label("Start Time"),
      end: Joi.date().required().label("End Time"),
    })
      .required()
      .label("Timings"),
    days: Joi.object({
      monday: Joi.boolean().required(),
      tuesday: Joi.boolean().required(),
      wednesday: Joi.boolean().required(),
      thursday: Joi.boolean().required(),
      friday: Joi.boolean().required(),
      saturday: Joi.boolean().required(),
      sunday: Joi.boolean().required(),
    })
      .required()
      .label("Days"),
    dateOfJoining: Joi.date()
      .required()
      .default(Date.now)
      .label("Date of Joining"),
  }),
});

// Login schema
const LoginUserValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.object({
      iv: Joi.string().required(),
      ciphertext: Joi.string().required(),
    }),
  }),
});

// Update password schema
const UpdatePasswordValidation = celebrate({
  body: Joi.object({
    old_password: passwordComplexity().required().label("Old Password"),
    new_password: passwordComplexity().required().label("New Password"),
  }),
});

// password validation schema
const StrongPasswordValidation = (body) => {
  const schema = Joi.object({
    password: passwordComplexity().required().label("password"),
  });
  const { error } = schema.validate(body);
  if (error) {
    return error.details[0].message;
  }

  return null;
};

module.exports = {
  RegisterStudentValidation,
  LoginUserValidation,
  UpdatePasswordValidation,
  StrongPasswordValidation,
};
