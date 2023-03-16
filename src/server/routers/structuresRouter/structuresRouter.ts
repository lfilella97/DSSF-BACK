import { Router } from "express";
import {
  deleteStructure,
  getStructures,
} from "../../controllers/structuresControllers/structuresControllers.js";
import auth from "../../middleware/auth/auth.js";

const structuresRouter = Router();

structuresRouter.get("/", getStructures);
structuresRouter.delete("/:id", auth, deleteStructure);

export default structuresRouter;
