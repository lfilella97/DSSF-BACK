import { Router } from "express";
import getStructures from "../../controllers/structuresControllers/structuresControllers.js";

const structuresRouter = Router();

structuresRouter.get("/", getStructures);

export default structuresRouter;
