import { Router } from "express";
import { validate } from "express-validation";
import loginUser from "../../controllers/userControllers/userControllers.js";
import loginSchema from "../../schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
