import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import statusCodes from "../../../utils/statusCodes.js";

const {
  clientError: { notFound },
} = statusCodes;

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    "Path not not found",
    notFound,
    "Endpoint not found"
  );

  next(error);
};

export default notFoundError;
