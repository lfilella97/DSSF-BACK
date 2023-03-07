import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import debug from "debug";
import CustomError from "../../../CustomError/CustomError.js";
import { User } from "../../../database/models/userSchema/userSchema.js";
import { UserCredentials } from "../../types.js";

const createDebug = debug("DSSF:login");

const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName }).exec();

  if (!user) {
    const userNameError = new CustomError(
      "Incorrect userName",
      400,
      "Wrong credentials"
    );

    next(userNameError);
    return;
  }

  const isPassword = await bcrypt.compare(password, user.password)!;

  if (!isPassword) {
    const customError = new CustomError(
      "Incorrect password",
      401,
      "Incorrect credentials"
    );

    next(customError);
    return;
  }

  const jwtPayload = {
    sub: user?._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

  createDebug("User logged in");

  res.status(200).json({ token });
};

export default loginUser;
