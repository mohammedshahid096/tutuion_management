const { celebrate, Joi } = require("celebrate");

const textBuilderAiPromptValidation = celebrate({
  body: Joi.object({
    userPrompt: Joi.string().trim().required().label("user prompt"),
  }),
});

module.exports = {
  textBuilderAiPromptValidation,
};
