import { type Request, type Response, type NextFunction } from "express";
import debug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";

const createDebug = debug("DSSF:generalError");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createDebug((error as Error).message);

  res.status(error.statusCode).json({ error: error.publicMessage });
};

export default generalError;
