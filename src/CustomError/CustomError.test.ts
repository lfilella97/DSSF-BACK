import statusCodes from "../utils/statusCodes";
import CustomError from "./CustomError";
import {} from "./../";

const {
  clientError: { badRequest, notFound },
} = statusCodes;

describe("Given the CustomError Class", () => {
  describe("When it is instancieted with message 'Wrong credentials'", () => {
    test("Then it should create a CustomError with message 'Wrong userName'", () => {
      const expectedMessage = "Wrong userName";

      const customError = new CustomError("Wrong userName", badRequest, "");

      expect(expectedMessage).toStrictEqual(customError.message);
    });
  });

  describe("When it is instancieted with public message 'Wrong credentials'", () => {
    test("Then it should create a CustomError with public message 'Wrong credentials'", () => {
      const expectedMessage = "Wrong credentials";

      const customError = new CustomError("", badRequest, "Wrong credentials");

      expect(expectedMessage).toStrictEqual(customError.publicMessage);
    });
  });

  describe("When it is instancieted with status 404", () => {
    test("Then it should create a CustomError with status 404", () => {
      const expectedStatus = notFound;

      const customError = new CustomError("", notFound, "");

      expect(expectedStatus).toStrictEqual(customError.statusCode);
    });
  });
});
