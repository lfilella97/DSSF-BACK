/* eslint-disable @typescript-eslint/naming-convention */
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDatabase from "../../../database/connectDatabase";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";
import statusCodes from "../../../utils/statusCodes";
import app from "../../app";
import { mockCustomStrutcureRequest } from "../../controllers/structuresControllers/structureControllersMocks";

const structure = mockCustomStrutcureRequest.body;

const {
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
      await Structure.create(structure);

      const response = await request(app).get("/structures").expect(okCode);

      expect(response.body).toHaveProperty("structures");
    });
  });
});

describe("Given Delete structure route", () => {
  describe("When it receives a request with the the id `640fd6f123e7acfcf7100ad3`", () => {
    test("Then it should return an object with the property deleted: `Cova de l'Aranyó Romeo`", async () => {
      const { _id: id } = await Structure.create(structure);
      const auth =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDc4ZWJjMjBiZGVjYjcxMzY0OTBlYSIsInVzZXJOYW1lIjoiYm9saWN1Ym8iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2Nzg5MjE5NzN9.IaCNZ40hGPGbn1CMT1lEjWjDngYujqyEKX_-X8pZa3g";
      const expectedResult = { deleted: "Cova de l'Aranyó Romeo" };

      const response = await request(app)
        .delete(`/structures/${id.toString()}`)
        .set({ Authorization: auth })
        .expect(okCode);

      expect(response.body).toStrictEqual(expectedResult);
    });
  });
});
