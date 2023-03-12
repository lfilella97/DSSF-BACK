import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";

const getStructures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const structures = await Structure.find().exec();
  try {
    if (!structures) {
      throw new CustomError(
        "Structures not found",
        404,
        "Structures not found"
      );
    }

    res.status(200).json({ structures });
  } catch (error) {
    next(error);
  }
};

export default getStructures;
