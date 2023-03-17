import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import statusCodes from "../../../utils/statusCodes.js";
import {
  type CustomJwtPayload,
  type CustomStructureRequest,
} from "../../types";

const {
  clientError: { forbbiden, unauthorized },
} = statusCodes;

const auth = (
  req: CustomStructureRequest,
  res: Response,
  next: NextFunction
) => {
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

    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    req.userId = id;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
