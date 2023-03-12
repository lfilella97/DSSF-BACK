import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDatabase from "../../../database/connectDatabase";
import app from "../../app";
import { type Structures, type UserCredentials } from "../../types";
import statusCodes from "../../../utils/statusCodes";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";

const {
  clientError: { notFound },
  success: { okCode },
} = statusCodes;

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Structure.deleteMany();
});

describe("Given GET structures route", () => {
  describe("When it receives a request", () => {
    test("Then it should return a list of structures", async () => {
      const mockStucturesList: Structures = [];
      const expectedResult = { structures: [] };

      await Structure.create(mockStucturesList);

      const response = await request(app).get("/structures").expect(okCode);

      expect(response.body).toStrictEqual(expectedResult);
    });
  });
});
