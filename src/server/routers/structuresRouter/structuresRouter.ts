import { Router } from "express";
import multer from "multer";
import {
  createStructure,
  deleteStructure,
  getStructures,
} from "../../controllers/structuresControllers/structuresControllers.js";
import auth from "../../middleware/auth/auth.js";
import storage from "../../storage.js";

const structuresRouter = Router();
const upload = multer({ storage });

structuresRouter.get("/", getStructures);
structuresRouter.delete("/:id", auth, deleteStructure);
structuresRouter.post("/create", auth, upload.single("image"), createStructure);

export default structuresRouter;
