import { type NextFunction, type Request, type Response } from "express";
import statusCodes from "../../../utils/statusCodes";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";
import CustomError from "../../../CustomError/CustomError";
import {
  createStructure,
  deleteStructure,
  getStructure,
  getStructures,
} from "./structuresControllers";
import { type CustomStructureRequest } from "../../types";
import {
  expectedByIdResponse,
  findErrorMock,
  findMock,
  mockCustomStrutcureRequest,
  mockDatabaseResponse,
  mockGetStructuresRequest,
} from "../../../utils/mocks";

const {
  success: { okCode, created },
} = statusCodes;

const request: Partial<CustomStructureRequest> = mockGetStructuresRequest;

const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn().mockReturnThis();

beforeEach(() => jest.clearAllMocks());

describe("Given getStructures controller", () => {
  describe("When it recieves a request`", () => {
    test("Then it should respond with status 200 and respond with a list of structures", async () => {
      const expectedStatus = okCode;
      const expectedBody = {
        structures: [],
        currentPage: 1,
        totalPages: 1,
        totalStructures: 1,
      };

      Structure.find = jest.fn().mockImplementation(() => findMock);

      await getStructures(
        request as CustomStructureRequest,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it recieves a request with query type`", () => {
    test("Then it should respond with status 200 and respond with a list of structures", async () => {
      const expectedStatus = okCode;
      const request: Partial<CustomStructureRequest> = {
        query: { type: "General", limit: 2, page: 1 },
      };

      const expectedBody = {
        structures: [],
        currentPage: 1,
        totalPages: 1,
        totalStructures: 1,
      };

      Structure.find = jest.fn().mockImplementation(() => findMock);

      await getStructures(
        request as CustomStructureRequest,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it recieves a request but throw an error`", () => {
    test("Then it should call next function with  `Not found` error message", async () => {
      const expectedError = new CustomError(
        "Structures not found",
        404,
        "structures not found"
      );

      Structure.find = jest.fn().mockImplementation(() => findErrorMock);

      await getStructures(
        request as CustomStructureRequest,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(expectedError);
    });
  });
});

describe("Given deleteStructure controller", () => {
  describe("When it recieves a request with the id: `640fd6f123e7acfcf7100acd`", () => {
    test("Then it should respond with status 200 and respond with a list of structures and it exists on database", async () => {
      const expectedStatus = okCode;
      const expectedBody = { deleted: "Balma murada del Triquell gran" };

      const databaseResponse = mockDatabaseResponse;

      request.params = { id: `640fd6f123e7acfcf7100acd` };

      Structure.findOneAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(databaseResponse),
      }));

      await deleteStructure(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it recieves a request with empty id: ``", () => {
    test("Then it should call next function with status 400", async () => {
      const expectederror = new CustomError(
        "ObjectId not valid",
        400,
        "Wrong data"
      );

      const databaseResponse = mockDatabaseResponse;

      request.params = { id: `` };

      Structure.findOneAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(databaseResponse),
      }));

      await deleteStructure(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(expectederror);
    });
  });

  describe("When it recieves a request with a id that does not match with any database structure id", () => {
    test("Then it should call next function with status 404", async () => {
      const expectederror = new CustomError(
        "Can't delete",
        404,
        "Can't delete"
      );

      request.params = { id: `640fd6f123e7acfcf7100ad3` };

      Structure.findOneAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(false),
      }));

      await deleteStructure(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(expectederror);
    });
  });
});

describe("Given the createStructure controller", () => {
  describe("When it recieves a request with 'Cova de l'Aranyó Romeo'", () => {
    test("Then it should respond with a message `Cova de l'Aranyó Romeo created`", async () => {
      const expectedStatus = created;
      const expectedBody = { message: "Cova de l'Aranyó Romeo created" };

      const request: Partial<CustomStructureRequest> =
        mockCustomStrutcureRequest;

      Structure.create = jest.fn().mockResolvedValue(request.body);

      await createStructure(
        request as CustomStructureRequest,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it recieves a request with 'Aljub SN08'", () => {
    test("Then it should respond with a message `Aljub SN08 created`", async () => {
      const expectedError = new CustomError(
        `Can't create structure`,
        409,
        "Can't create structure"
      );

      const request: Partial<CustomStructureRequest> =
        mockCustomStrutcureRequest;

      Structure.create = jest.fn().mockReturnValue(false);

      await createStructure(
        request as CustomStructureRequest,
        response as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given getStructure controller", () => {
  describe("When it recieves a request with the id: `640fd6f123e7acfcf7100acd`", () => {
    test("Then it should respond with status 200 and respond with a structures with id `640fd6f123e7acfcf7100acd`", async () => {
      const expectedStatus = okCode;

      const databaseResponse = mockDatabaseResponse;

      request.params = { id: `640fd6f123e7acfcf7100acd` };

      Structure.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(databaseResponse),
      }));

      await getStructure(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedByIdResponse);
    });
  });

  describe("When it recieves a request with empty id: ``", () => {
    test("Then it should call next function with status 400", async () => {
      const expectederror = new CustomError(
        "ObjectId not valid",
        400,
        "Wrong data"
      );

      const databaseResponse = mockDatabaseResponse;

      request.params = { id: `` };

      Structure.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(databaseResponse),
      }));

      await getStructure(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(expectederror);
    });
  });

  describe("When it recieves a request with a id that does not match with any database structure id", () => {
    test("Then it should call next function with status 404", async () => {
      const expectederror = new CustomError("Can't get", 404, "Can't get");

      request.params = { id: `640fd6f123e7acfcf7100ad3` };

      Structure.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(false),
      }));

      await getStructure(
        request as Request<{ id: string }>,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(expectederror);
    });
  });
});
