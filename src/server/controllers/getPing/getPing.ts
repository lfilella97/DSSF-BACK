import { type Response, type Request } from "express";

const getPing = async (req: Request, res: Response) => {
  res.status(200).json({ ping: "pong" });
};

export default getPing;
