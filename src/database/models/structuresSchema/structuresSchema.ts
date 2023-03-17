import { model, Schema, SchemaTypes } from "mongoose";
import { User } from "../userSchema/userSchema";

const structureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: User,
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
    default: Date.now,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
});

export const Structure = model("Structure", structureSchema, "structures");
