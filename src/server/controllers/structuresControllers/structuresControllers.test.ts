import { type NextFunction, type Request, type Response } from "express";
import statusCodes from "../../../utils/statusCodes";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";
import CustomError from "../../../CustomError/CustomError";
import { deleteStructure, getStructures } from "./structuresControllers";
import { type DeleteBodyRequest } from "../../types";

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

describe("Given deleteStructure controller", () => {
  describe("When it recieves a request with the id: `640fd6f123e7acfcf7100acd`", () => {
    test("Then it should respond with status 200 and respond with a list of structures and it exists on database", async () => {
      const expectedStatus = okCode;
      const expectedBody = { deleted: "Balma murada del Triquell gran" };

      const databaseResponse = {
        _id: {
          $oid: "640fd6f123e7acfcf7100acd",
        },
        coordenateX: "0.644192006438971",
        coordenateY: "41.34776900522411",
        elevation: "428",
        name: "Balma murada del Triquell gran",
        owner: "admin",
        description: "",
        location: "La Granadella",
        creationTime: "2020-09-17T20:33:27Z",
        type: "Construction",
        image:
          "https://sfxfnjejlztsnoxyochi.supabase.co/storage/v1/object/public/structures/Balma%20murada%20del%20Triquell%20Gran.jpg?t=2023-03-14T00%3A52%3A11.396Z",
      };

      request.body = { id: `640fd6f123e7acfcf7100acd` };

      Structure.findOneAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(databaseResponse),
      }));

      await deleteStructure(
        request as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          DeleteBodyRequest
        >,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });

    test("Then it should call next function with `Can't delete`, and it does not exists on database", async () => {
      const customError = new CustomError("Can't delete", 404, "Can't delete");

      request.body = { id: `640fd6f123e7acfcf7100acd` };

      Structure.findOneAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(false),
      }));

      await deleteStructure(
        request as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          DeleteBodyRequest
        >,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(customError);
    });
  });
});
