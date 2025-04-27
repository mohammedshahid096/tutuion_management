const { celebrate, Joi } = require("celebrate");
const passwordComplexity = require("joi-password-complexity");

// register schema
const RegisterUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
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
  RegisterUserValidation,
  LoginUserValidation,
  UpdatePasswordValidation,
  StrongPasswordValidation,
};
