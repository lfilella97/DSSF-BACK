import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import statusCodes from "../../../utils/statusCodes.js";
import { type AuthRequest } from "../../types";

const {
  clientError: { forbbiden, unauthorized, tokenExpiredOrInvalid },
} = statusCodes;

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  try {
    if (!authHeader) {
      throw new CustomError(
        "Dont have Authorization",
        forbbiden,
        "Dont have Authorization"
      );
    }

    if (!authHeader.includes("Bearer")) {
      throw new CustomError(
        "Missing authorization header",
        unauthorized,
        "Missing token"
      );
    }

    const token = authHeader.replace(/^Bearer\s*/i, "");

    jwt.verify(token, process.env.JWT_SECRET!);

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
