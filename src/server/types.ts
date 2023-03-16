import { type Request } from "express";

export interface RegisterUserCredentials {
  email: string;
  userName: string;
  password: string;
}
export type UserCredentials = Pick<
  RegisterUserCredentials,
  "userName" | "password"
>;
export interface CustomJwtPayload {
  id: string;
  userName: string;
  isAdmin?: boolean;
}

export interface StructureInterface {
  name: string;
  owner: string;
  type: string;
  coordenateX: string;
  coordenateY: string;
  elevation: string;
  creationTime: Date;
  description: string;
  location: string;
  image: string;
}

export type StructuresInterface = StructureInterface[];

export type AuthRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  { token: string }
>;
