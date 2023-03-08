import "./../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createDebug from "debug";
import CustomError from "../../../CustomError/CustomError.js";
import { User } from "../../../database/models/userSchema/userSchema.js";
import { type UserCredentials } from "../../types.js";

const debug = createDebug("DSSF:ruters:userController:login");

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
      throw new CustomError("Incorrect userName", 400, "Wrong credentials");
    }

    const isPassword = await bcrypt.compare(password, user.password!);

    if (!isPassword) {
      throw new CustomError("Incorrect password", 401, "Wrong credentials");
    }

    const jwtPayload = {
      id: user?._id,
      userName: user?.userName,
      isAdmin: user?.isAdmin,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    debug(`${userName} has been logged succesfully`);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
