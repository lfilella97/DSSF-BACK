import { type Response, type Request } from "express";

const getPing = async (req: Request, res: Response) => {
  res.status(200).json("pong");
};

export default getPing;
