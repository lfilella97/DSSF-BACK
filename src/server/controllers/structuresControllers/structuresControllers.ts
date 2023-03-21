import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../../CustomError/CustomError.js";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema.js";
import { type CustomStructureRequest } from "../../types.js";

export const getStructures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let structures;
  const type = req.query?.type;

  try {
    if (type) {
      structures = await Structure.find({ type }).exec();
    } else {
      structures = await Structure.find().exec();
    }

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
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("ObjectId not valid", 400, "Wrong data");
    }

    const deleted = await Structure.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new CustomError("Can't delete", 404, "Can't delete");
    }

    res.status(200).json({ deleted: deleted.name });
  } catch (error) {
    next(new CustomError((error as Error).message, 400, "Can't delete"));
  }
};

export const createStructure = async (
  req: CustomStructureRequest,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const owner = req.userId;
  try {
    const created = await Structure.create({
      ...body,
      image: body.imageBackUp,
      owner,
    });
    if (!created) {
      throw new CustomError(
        `Can't create structure`,
        409,
        "Can't create structure"
      );
    }

    res.status(201).json({ message: `${created.name} created` });
  } catch (error) {
    next(
      new CustomError((error as Error).message, 409, "Can't create structure")
    );
  }
};

export const getStructure = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("ObjectId not valid", 400, "Wrong data");
    }

    const structure = await Structure.findById(id).exec();

    if (!structure) {
      throw new CustomError("Can't get", 404, "Can't get");
    }

    res.status(200).json({ structure });
  } catch (error) {
    next(new CustomError((error as Error).message, 400, "Can't get"));
  }
};
