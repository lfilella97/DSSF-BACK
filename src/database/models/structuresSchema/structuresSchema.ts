import { model, Schema } from "mongoose";

const structureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  coordenateX: {
    type: String,
  },
  coordenateY: {
    type: String,
  },
  elevation: {
    type: String,
  },
  creationTime: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const Structure = model("Structure", structureSchema, "structures");
