import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import { User } from "../../../database/models/userSchema/userSchema";
import loginUser from "./userControllers";
import CustomError from "../../../CustomError/CustomError";
import { type UserCredentials } from "../../types";
import statusCodes from "../../../utils/statusCodes.js";

const {
  success: { okCode },
  clientError: { unauthorized },
  serverError: { internalServer },
} = statusCodes;

const bernat = {
  password: "bernat",
  userName: "bolicubo",
};
type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
const request: Partial<CustomRequest> = {
  body: bernat,
};

const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn().mockReturnThis();

beforeEach(() => jest.clearAllMocks());

describe("Given logInUser controller", () => {
  describe("When it recieves a request with bernat on body and the credentials are ok`", () => {
    test("Then it should respond with status 200 and generate a token", async () => {
      const expectedStatus = okCode;
      const expectedBody = {
        token: "$2y$10$GT6K.TAnsjnLshM9KdwehOJsmDADR8y2x7tLr3C5CxUvfgh4NZUwm",
      };

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(expectedBody.token);

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...bernat,
          isAdmin: true,
          _id: 12345678,
        }),
      }));

      await loginUser(request as CustomRequest, response as Response, next);

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it recieves a request with bernat on body and it is wrong`", () => {
    test("Then it should call next function with  `Incorrect user` error message", async () => {
      const customError = new CustomError(
        "Incorrect userName",
        401,
        "Incorrect credentials"
      );

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(false),
      }));

      await loginUser(request as CustomRequest, response as Response, next);

      expect(next).toBeCalledWith(customError);
    });
  });

  describe("When it recieves a request with bernat on body with an incorrect password`", () => {
    test("Then it should call next function with `Incorrect password` error message", async () => {
      const customError = new CustomError(
        "Incorrect password",
        unauthorized,
        "Incorrect credentials"
      );
      const next: NextFunction = jest.fn().mockReturnThis();

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...bernat,
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(request as CustomRequest, response as Response, next);

      expect(next).toBeCalledWith(customError);
    });
  });

  describe("When it recieves a request with bernat and the database throws an error`", () => {
    test("Then it should call next function with", async () => {
      const customError = new CustomError(
        "Server not responding",
        internalServer,
        "Internal server error"
      );

      const next: NextFunction = jest.fn().mockReturnThis();

      User.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockRejectedValue(customError),
      }));

      await loginUser(request as CustomRequest, response as Response, next);

      expect(next).toBeCalledWith(customError);
    });
  });
});
