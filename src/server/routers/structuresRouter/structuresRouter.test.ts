/* eslint-disable @typescript-eslint/naming-convention */
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDatabase from "../../../database/connectDatabase";
import { Structure } from "../../../database/models/structuresSchema/structuresSchema";
import statusCodes from "../../../utils/statusCodes";
import app from "../../app";
import { type StructureInterface } from "../../types";

const structure: StructureInterface = {
  coordenateX: "0.704288240522146",
  coordenateY: "41.36684965342283",
  elevation: "499",
  location: "La Granadella",
  name: "Cova de l'Aranyó Romeo",
  description:
    "It is a walled balma of reduced dimensions, about 15 meters wide and also shallow, about 6 meters. Unlike most walled balmas in the area, this one has a single room and, in addition, a particular water storage system thanks to an underground water spring. At the bottom of the balma there is a large and closed cistern by some walls that reach the roof. Likewise, there is also a sink attached to the wall of the cistern. A water line, the kind that cannot be stored towards the properties in front of the balma, which have as well as a constant irrigation system. The front wall is remarkably thick and does not reach the roof. The interior is accessed through a doorless opening in the wall, which is reached after go up some stone stairs, of more recent Construction, you can see a table and some stumps that act as seats in the flight both.\nUse and function\nLivestock shelter. Cabin",
  owner: "64078ebc20bdecb7136490ea",
  creationTime: new Date(),
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
