import { type Request, type Response, type NextFunction } from "express";
import createDebug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug("DSSF:generalError");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug((error as Error).message);

  res.status(error.statusCode).json({ error: error.publicMessage });
};

export default generalError;
