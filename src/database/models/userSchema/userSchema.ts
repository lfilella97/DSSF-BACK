import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
  },
});

export const User = model("User", userSchema, "users");
