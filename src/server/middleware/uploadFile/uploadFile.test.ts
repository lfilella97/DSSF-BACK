import { type NextFunction, type Response } from "express";
import { mockCustomStrutcureRequest } from "../../../utils/mocks";
import { type CustomStructureRequest } from "../../types";
import fs from "fs/promises";
import { supabase, uploadFile } from "./uploadFile";
import CustomError from "../../../CustomError/CustomError";

const mockImagePath = "uploads/image.jpg";
const response: Partial<Response> = {};
const next: NextFunction = jest.fn().mockReturnThis();

beforeEach(() => jest.clearAllMocks());

const file: Partial<Express.Multer.File> = { filename: "image.jpg" };

describe("Given the uploadFile middleware", () => {
  describe("When it receives a request with `Cova de l'Aranyó Romeo` on its boddy", () => {
    test("Then it should call next function", async () => {
      const request: Partial<CustomStructureRequest> = {
        ...mockCustomStrutcureRequest,
        file: file as Express.Multer.File,
      };
      fs.readFile = jest.fn().mockResolvedValueOnce("uploads/image.jpg");

      supabase.storage.from = jest.fn();
      supabase.storage.from("").getPublicUrl = jest.fn().mockReturnValueOnce({
        data: { publicUrl: mockImagePath },
      });

      await uploadFile(
        request as CustomStructureRequest,
        response as Response,
        next
      );

      expect(next).toBeCalled();
    });
  });

  describe("When it receives a request with `Cova de l'Aranyó Romeo` on its boddy", () => {
    test("Then it should call next function", async () => {
      const request: Partial<CustomStructureRequest> = {
        ...mockCustomStrutcureRequest,
        file: file as Express.Multer.File,
      };

      const expectedError = new CustomError(
        "cant'upload file",
        400,
        "can't upload file"
      );
      fs.readFile = jest.fn().mockRejectedValue(expectedError);

      await uploadFile(
        request as CustomStructureRequest,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(expectedError);
    });
  });
});
