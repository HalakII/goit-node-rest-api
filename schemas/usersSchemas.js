import Joi from "joi";
import { emailRegex } from "../constants/user-constants.js";

export const userRegisterSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({ "string.pattern.base": `Incorrect e-mail format` }),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});
