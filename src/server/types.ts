import { type Request } from "express";
export interface CustomStructureRequest
  extends Request<
    Partial<Params>,
    Record<string, unknown>,
    Partial<StructureInterface>,
    Partial<Query>
  > {
  userId?: string;
  imageBackUp?: string;
}

export interface Params {
  id: string;
}
export interface Query {
  page: number;
  type: string;
  limit: number;
  token: string;
}

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
  imageBackUp: string;
}

export type StructuresInterface = StructureInterface[];
