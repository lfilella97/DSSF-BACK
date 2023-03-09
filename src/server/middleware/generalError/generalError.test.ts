import { type Response, type Request, type NextFunction } from "express";
import { type errors, ValidationError } from "express-validation";
import CustomError from "../../../CustomError/CustomError.js";
import statusCodes from "../../../utils/statusCodes.js";
import generalError from "./generalError.js";

const {
  clientError: { notFound, badRequest },
  serverError: { internalServer },
} = statusCodes;

const request: Partial<Request> = {};
const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const next: NextFunction = jest.fn();

beforeEach(() => jest.clearAllMocks());

describe("Given the controller generalError", () => {
  describe("When it receives a custom error of Path not found", () => {
    test("Then it should emit a response with the error status 404", async () => {
      const error = new CustomError(
        "Path not not found",
        notFound,
        "Endpoint not found"
      );

      const errorStatus = notFound;
      generalError(error, request as Request, response as Response, next);

      expect(response.status).toBeCalledWith(errorStatus);
    });
  });

  describe("When it receives a custom error of Path not found", () => {
    test("Then it should emit a response with the error status 404", async () => {
      const error = new CustomError("", NaN, "");
      const expectedError = { error: "Something went wrong" };

      const errorStatus = internalServer;
      generalError(error, request as Request, response as Response, next);

      expect(response.status).toBeCalledWith(errorStatus);
      expect(response.json).toBeCalledWith(expectedError);
    });
  });

  describe("When it receives a validation error", () => {
    test("Then it should emit a response with the error status ", async () => {
      const error: errors = {
        body: [
          {
            name: "ValidationError",
            isJoi: true,
            annotate(stripColors) {
              return "";
            },
            _original: "",
            message: "'email' is not allowed to be empty",
            details: [
              {
                message: "",
                path: [""],
                type: "",
              },
            ],
          },
        ],
      };
      const expectedStatus = badRequest;
      const publicMessage = "'email' is not allowed to be empty";
      const validationError = new ValidationError(error, { statusCode: 400 });

      generalError(
        validationError as unknown as CustomError,
        request as Request,
        response as Response,
        next
      );

      expect(response.json).toHaveBeenCalledWith({ error: publicMessage });
      expect(response.status).toBeCalledWith(expectedStatus);
    });
  });
});
