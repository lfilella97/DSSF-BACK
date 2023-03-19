import { Router } from "express";
import { validate } from "express-validation";
import multer from "multer";
import {
  createStructure,
  deleteStructure,
  getStructure,
  getStructures,
} from "../../controllers/structuresControllers/structuresControllers.js";
import auth from "../../middleware/auth/auth.js";
import sharpFile from "../../middleware/sharpFile/sharpFile.js";
import { uploadFile } from "../../middleware/uploadFile/uploadFile.js";
import structureSchema from "../../schemas/structureSchema.js";
import storage from "../../storage.js";

const structuresRouter = Router();
const upload = multer({
  storage,
  limits: {
    fileSize: 8000000,
  },
});

structuresRouter.get("/", getStructures);

structuresRouter.get("/:id", getStructure);

structuresRouter.delete("/:id", auth, deleteStructure);

structuresRouter.post(
  "/create",
  auth,
  upload.single("image"),
  validate(structureSchema, {}, { abortEarly: false }),
  sharpFile,
  uploadFile,
  createStructure
);

export default structuresRouter;
