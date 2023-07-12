const Joi = require("joi");
const expressJoi = require("express-joi-validation");

const validator = expressJoi.createValidator({});

const signup = Joi.object({
  fname: Joi.string().max(50).required().messages({
    "any.required": "First name is required",
  }),
  lname: Joi.string().max(50).required().messages({
    "any.required": "Last name is required",
  }),
  gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.required": "Gender is required",
  }),
  date: Joi.date().iso().required().messages({
    "any.required": "Date is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .regex(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/
      )
    )
    .messages({
      "any.required": "Password is required",
      "string.pattern.base":
        "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character (!@#$%^&*()).",
    }),
});

const signin = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .regex(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/
      )
    )
    .messages({
      "any.required": "Password is required",
      "string.pattern.base":
        "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character (!@#$%^&*()).",
    }),
});

const signUpJOI = validator.body(signup);
const signInJOI = validator.body(signin);

module.exports = {
  signUpJOI,
  signInJOI,
};
