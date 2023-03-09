import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import bcryptjs from "bcryptjs";
import connectDatabase from "../../../database/connectDatabase";
import { User } from "../../../database/models/userSchema/userSchema";
import app from "../../app";
import { type UserCredentials } from "../../types";
import statusCodes from "../../../utils/statusCodes";

const {
  clientError: { unauthorized },
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
  await User.deleteMany();
});

describe("Given POST user/login route", () => {
  describe("When it receives a request with Bernat with rigth credentials", () => {
    test("Then it should return a token", async () => {
      const mockUser: UserCredentials = {
        userName: "bolicubo",
        password: "bernat",
      };
      const saltLength = 10;
      const hashedPassword = await bcryptjs.hash(mockUser.password, saltLength);
      const bernat = {
        ...mockUser,
        password: hashedPassword,
        isAdmin: true,
      };

      await User.create(bernat);

      const response = await request(app)
        .post("/user/login")
        .send(mockUser)
        .expect(okCode);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with Bernat and it does not exist on database", () => {
    test("Then it should return an error", async () => {
      const mockUser: UserCredentials = {
        userName: "bolicubo",
        password: "bernat",
      };

      const response = await request(app)
        .post("/user/login")
        .send(mockUser)
        .expect(unauthorized);

      expect(response.body).toStrictEqual({ error: "Wrong credentials" });
    });
  });
});
