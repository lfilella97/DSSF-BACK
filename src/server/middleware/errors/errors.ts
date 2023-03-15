import { type Request, type Response, type NextFunction } from "express";
import createDebug from "debug";
import CustomError from "../../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";
import statusCodes from "../../../utils/statusCodes.js";

const {
  serverError: { internalServer },
  clientError: { notFound },
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

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Path not not found",
    notFound,
    "Endpoint not found"
  );

  next(error);
};
