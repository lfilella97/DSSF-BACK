import { Joi } from "express-validation";

const loginSchema = {
  body: Joi.object({
    userName: Joi.string().min(3).max(14).required(),
    password: Joi.string().min(6).max(17).required(),
  }),
};

export default loginSchema;
