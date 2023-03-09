import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String },
  isAdmin: {
    type: String,
  },
});

export const User = model("User", userSchema, "users");
