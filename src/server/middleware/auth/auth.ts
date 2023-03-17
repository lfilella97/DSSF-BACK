import "../../../loadEnvironment.js";
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
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      throw new CustomError(
        "Dont have Authorization header",
        forbbiden,
        "Dont have Authorization"
      );
    }

    if (!authHeader.includes("Bearer")) {
      throw new CustomError(
        "Missing Bearer",
        unauthorized,
        "Dont have Authorization"
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
