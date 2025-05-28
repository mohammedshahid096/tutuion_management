const { celebrate, Joi } = require("celebrate");

const textBuilderAiPromptValidation = celebrate({
  body: Joi.object({
    userPrompt: Joi.string().required().label("user prompt"),
  }),
});

module.exports = {
  textBuilderAiPromptValidation,
};
