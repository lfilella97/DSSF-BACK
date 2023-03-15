import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDatabase from "../../../database/connectDatabase";
import app from "../../app";
import {
  type DeleteBodyRequest,
  type Structures,
  type UserCredentials,
} from "../../types";
import statusCodes from "../../../utils/statusCodes";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";
import { type Request } from "express";

const structure = {
  coordinateX: "0.704288240522146",
  coordinateY: "41.36684965342283",
  elevation: "499",
  location: "La Granadella",
  name: "Cova de l'Aranyó Romeo",
  description:
    "It is a walled balma of reduced dimensions, about 15 meters wide and also shallow, about 6 meters. Unlike most walled balmas in the area, this one has a single room and, in addition, a particular water storage system thanks to an underground water spring. At the bottom of the balma there is a large and closed cistern by some walls that reach the roof. Likewise, there is also a sink attached to the wall of the cistern. A water line, the kind that cannot be stored towards the properties in front of the balma, which have as well as a constant irrigation system. The front wall is remarkably thick and does not reach the roof. The interior is accessed through a doorless opening in the wall, which is reached after go up some stone stairs, of more recent Construction, you can see a table and some stumps that act as seats in the flight both.\nUse and function\nLivestock shelter. Cabin",
  owner: "admin",
  creationTime: "2021-05-17T17:25:35Z",
  type: "Construction",
  image:
    "https://sfxfnjejlztsnoxyochi.supabase.co/storage/v1/object/public/structures/cova%20de%20laranyo%20romeu.jpg?t=2023-03-14T00%3A53%3A46.803Z",
};

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
      const mockStucturesList: Structures = [];
      const expectedResult = { structures: [] };

      await Structure.create(mockStucturesList);

      const response = await request(app).get("/structures").expect(okCode);

      expect(response.body).toStrictEqual(expectedResult);
    });
  });
});

describe("Given Delete structure route", () => {
  describe("When it receives a request with the the id `640fd6f123e7acfcf7100ad3`", () => {
    test("Then it should return an object with the property deleted: `Cova de l'Aranyó Romeo`", async () => {
      const mockRequest: Partial<Request> = {};
      const { _id: id } = await Structure.create(structure);

      const expectedResult = { deleted: "Cova de l'Aranyó Romeo" };

      const response = await request(app)
        .delete(`/structures/${id.toString()}`)
        .send(mockRequest)
        .expect(okCode);

      expect(response.body).toStrictEqual(expectedResult);
    });
  });
});
