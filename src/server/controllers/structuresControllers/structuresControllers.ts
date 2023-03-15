import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema.js";
import { type DeleteBodyRequest } from "../../types.js";

export const getStructures = async (
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

export const deleteStructure = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    DeleteBodyRequest
  >,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const deleted = await Structure.findOneAndDelete({
      _id: id,
    }).exec();

    if (!deleted) {
      throw new CustomError("Can't delete", 404, "Can't delete");
    }

    res.status(200).json({ deleted: deleted.name });
  } catch (error) {
    next(error);
  }
};
