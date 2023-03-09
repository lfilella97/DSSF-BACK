import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
  },
});

export const User = model("User", userSchema, "users");
