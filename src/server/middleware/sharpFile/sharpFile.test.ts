import { type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import statusCodes from "../../../utils/statusCodes";
import { type CustomStructureRequest } from "../../types";
import sharpFile from "./sharpFile";
import { mockCustomStrutcureRequest } from "../../../utils/mocks";

const {
  clientError: { badRequest },
} = statusCodes;

beforeEach(() => jest.clearAllMocks());

let mockImageFile = jest.fn();

jest.mock("sharp", () => () => ({
  resize: jest.fn().mockReturnValue({
    webp: jest.fn().mockReturnValue({
      toFormat: jest.fn().mockReturnValue({ toFile: mockImageFile }),
    }),
  }),
}));

const next = jest.fn() as NextFunction;

const res: Partial<Response> = {};

const file: Partial<Express.Multer.File> = {
  filename: "AljubSN08",
  originalname: "AljubSN08.jpg",
};

const req: Partial<CustomStructureRequest> = mockCustomStrutcureRequest;

describe("Given an sharpFile middleware", () => {
  describe("When it receives a request with an image", () => {
    test("Then it should call its next method and put the optimized image to the request", async () => {
      const expectedImageName = "AljubSN08.webp";
      req.file = file as Express.Multer.File;

      await sharpFile(req as CustomStructureRequest, res as Response, next);

      expect(req.file.filename).toBe(expectedImageName);
    });
  });

  describe("When it receives a request without an image", () => {
    test("Then it should call its next method with an error", async () => {
      const newError = new CustomError(
        "Can't sharp image",
        badRequest,
        "Error optimizing the provided image"
      );

      mockImageFile = jest.fn().mockRejectedValue(newError);

      await sharpFile(req as CustomStructureRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
