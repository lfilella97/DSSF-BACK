import { type Response, type Request } from "express";
import statusCodes from "../../../utils/statusCodes.js";

const {
  success: { okCode },
} = statusCodes;

const getPing = async (req: Request, res: Response) => {
  res.status(okCode).json({ ping: "pong" });
};

export default getPing;
