import { type NextFunction, type Request, type Response } from "express";
import statusCodes from "../../../utils/statusCodes";
import getStructures from "./structuresControllers";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";
import CustomError from "../../../CustomError/CustomError";

const {
  success: { okCode },
} = statusCodes;

const request: Partial<Request> = {};

const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn().mockReturnThis();

beforeEach(() => jest.clearAllMocks());

describe("Given getStructure controller", () => {
  describe("When it recieves a request`", () => {
    test("Then it should respond with status 200 and respond with a list of structures", async () => {
      const expectedStatus = okCode;
      const expectedBody = { structures: [] };

      Structure.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue([]),
      }));

      await getStructures(request as Request, response as Response, next);

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it recieves a request but throw an error`", () => {
    test("Then it should call next function with  `Not found` error message", async () => {
      const customError = new CustomError(
        "Structures not found",
        404,
        "structures not found"
      );

      Structure.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(false),
      }));

      await getStructures(request as Request, response as Response, next);

      expect(next).toBeCalledWith(customError);
    });
  });
});
