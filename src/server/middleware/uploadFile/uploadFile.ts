import "../../../loadEnvironment.js";
import { type NextFunction, type Response } from "express";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import { type CustomStructureRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError.js";

export const supabase = createClient(
  `${process.env.SUPABASE_URL!}`,
  `${process.env.API_GATEWAY!}`
);

const bucket = supabase.storage.from("structures");

export const uploadFile = async (
  req: CustomStructureRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file?.filename;
    const imageFile = await fs.readFile(`uploads/${image!}`);

    await bucket.upload(`${image!}`, imageFile, {
      cacheControl: "31536000000",
    });

    req.body.imageBackUp = bucket.getPublicUrl(image!).data.publicUrl;

    next();
  } catch (error) {
    next(new CustomError((error as Error).message, 400, "can't upload file"));
  }
};
