import "./../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createDebug from "debug";
import CustomError from "../../../CustomError/CustomError.js";
import { User } from "../../../database/models/userSchema/userSchema.js";
import { type CustomJwtPayload, type UserCredentials } from "../../types.js";
import statusCodes from "../../../utils/statusCodes.js";

const {
  success: { okCode },
  clientError: { unauthorized },
} = statusCodes;
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
      throw new CustomError(
        "Incorrect userName",
        unauthorized,
        "Wrong credentials"
      );
    }

    if (!(await bcrypt.compare(password, user.password!))) {
      throw new CustomError(
        "Incorrect password",
        unauthorized,
        "Wrong credentials"
      );
    }

    const jwtPayload: CustomJwtPayload = {
      id: user?._id.toString(),
      userName: user?.userName,
      isAdmin: user?.isAdmin,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    debug(`${userName} has been logged succesfully`);

    res.status(okCode).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
