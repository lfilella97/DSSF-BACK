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
  try {
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
        "Wrong credentials"
      );

      next(customError);
      return;
    }

    const jwtPayload = {
      id: user?._id,
      userName: user?.userName,
      isAdmin: user?.isAdmin,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    createDebug(`${userName} has been logged succesfully`);

    res.status(200).json({ token });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Internal server error"
    );
    next(customError);
  }
};

export default loginUser;
