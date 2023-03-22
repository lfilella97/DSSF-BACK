import { type CustomStructureRequest } from "../server/types";

export const mockDatabaseResponse = {
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
const file: Partial<Express.Multer.File> = { filename: "image.jpg" };

export const mockCustomStrutcureRequest = {
  body: {
    imageBackUp: "",
    coordenateX: "0.644192006438971",
    coordenateY: "41.34776900522411",
    elevation: "428",
    name: "Cova de l'Aranyó Romeo",
    owner: "64078ebc20bdecb7136490ea",
    description: "",
    location: "La Granadella",
    creationTime: new Date(),
    type: "Construction",
    image:
      "https://sfxfnjejlztsnoxyochi.supabase.co/storage/v1/object/public/structures/Balma%20murada%20del%20Triquell%20Gran.jpg?t=2023-03-14T00%3A52%3A11.396Z",
  },
  file: file as Express.Multer.File,
  userId: "w3e45678",
};

export const expectedByIdResponse = {
  structure: {
    _id: { $oid: "640fd6f123e7acfcf7100acd" },
    coordenateX: "0.644192006438971",
    coordenateY: "41.34776900522411",
    creationTime: "2020-09-17T20:33:27Z",
    description: "",
    elevation: "428",
    image:
      "https://sfxfnjejlztsnoxyochi.supabase.co/storage/v1/object/public/structures/Balma%20murada%20del%20Triquell%20Gran.jpg?t=2023-03-14T00%3A52%3A11.396Z",
    location: "La Granadella",
    name: "Balma murada del Triquell gran",
    owner: "admin",
    type: "Construction",
  },
};

export const mockGetStructuresRequest: Partial<CustomStructureRequest> = {
  query: { page: 1, limit: 2, token: "qwertyuiop", type: "" },
};

const execMock = jest.fn().mockResolvedValue([]);
const skipMock = jest.fn().mockReturnThis();
const limitMock = jest.fn().mockReturnThis();
const countMock = jest.fn().mockResolvedValue(1);

export const findMock = {
  skip: skipMock,
  limit: limitMock,
  exec: execMock,
  countDocuments: countMock,
};

const execErrorMock = jest.fn().mockResolvedValue(false);

export const findErrorMock = {
  skip: skipMock,
  limit: limitMock,
  exec: execErrorMock,
  countDocuments: countMock,
};
