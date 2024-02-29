import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({ "string.pattern.base": "XXXXX@XXX.com/XXXXX@XXX.net" }),
  phone: Joi.string()
    .pattern(/^\+?3?8?(0\d{9})$/)
    .required()
    .messages({ "string.pattern.base": "+380XXXXXXXXX/0XXXXXXXXX" }),
});

export const updateContactSchema = Joi.object({});
