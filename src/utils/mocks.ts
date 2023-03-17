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
