import { type Request, type Response, type NextFunction } from "express";
import createDebug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";

const debug = createDebug("DSSF:generalError");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const errors = error.details.body
      ?.map((detail) => detail.message)
      .join(" & ");

    debug(errors);
    error.publicMessage = errors!;
  }

  debug(error.message);

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};

export default generalError;
