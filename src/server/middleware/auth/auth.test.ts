import { type Response, type NextFunction, type Request } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError";
import statusCodes from "../../../utils/statusCodes";
import { type AuthRequest } from "../../types";
import auth from "./auth";

const {
  clientError: { forbbiden, unauthorized },
} = statusCodes;

const req: Partial<AuthRequest> = {
  header: jest.fn().mockReturnValue(undefined),
};
const next: NextFunction = jest.fn();
const res: Partial<Response> = {};

describe("Given the auth middleware", () => {
  describe("When it receives a request without authorization", () => {
    test("Then it should call the method next with an error and the message 'Dont have Authorization'", () => {
      const expectedError = new CustomError(
        "Dont have Authorization",
        forbbiden,
        "Dont have Authorization"
      );

      auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request and the authorization header does not contains 'Bearer'", () => {
    test("Then it should call the method next with an error and the message 'Missing bearer in authorization header'", () => {
      const expectedError = new CustomError(
        "Missing authorization header",
        unauthorized,
        "Missing token"
      );

      req.header = jest.fn().mockReturnValueOnce("123456");

      auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an authoriratizon header that contains 'Bearer 243534656768urthdy3dg' and the token on header is verified", () => {
    test("Then it should call next function", () => {
      req.header = jest.fn().mockReturnValue("Bearer 6412499ddd378166223b2625");

      jwt.verify = jest.fn().mockResolvedValue(true);

      auth(req as AuthRequest, res as Response, next);

      expect(next).toBeCalled();
    });
  });
});
