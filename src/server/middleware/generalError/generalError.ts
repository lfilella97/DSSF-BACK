import { type Request, type Response, type NextFunction } from "express";
import createDebug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";
import statusCodes from "../../../utils/statusCodes.js";

const {
  serverError: { internalServer },
} = statusCodes;

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
    .status(error.statusCode || internalServer)
    .json({ error: error.publicMessage || "Something went wrong" });
};

export default generalError;
