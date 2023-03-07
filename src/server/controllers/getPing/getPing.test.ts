import { type Request, type Response } from "express";
import getPing from "./getPing";

const request: Partial<Request> = {};
const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnValue("pong"),
};

describe("Given getPing controller", () => {
  describe("When it receieves any request", () => {
    test("Then it should emit a response with text 'ping'", async () => {
      const status = 200;

      await getPing(request as Request, response as Response);

      expect(response.status).toBeCalledWith(status);
    });

    test("Then it shpuld emit a response with status 200", async () => {
      await getPing(request as Request, response as Response);

      expect(response.json).toBeCalledWith("pong");
    });
  });
});
