import { Router } from "express";
import {
  deleteStructure,
  getStructures,
} from "../../controllers/structuresControllers/structuresControllers.js";

const structuresRouter = Router();

structuresRouter.get("/", getStructures);
structuresRouter.delete("/:id", deleteStructure);

export default structuresRouter;
