import { Joi } from "express-validation";

const loginSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    owner: Joi.string().required(),
    coordenateX: Joi.string(),
    coordenateY: Joi.string(),
    elevation: Joi.string().required(),
    creationTime: Joi.date().required(),
    description: Joi.string(),
    location: Joi.string().required(),
  }),
};

export default loginSchema;
