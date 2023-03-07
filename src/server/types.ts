import { JwtPayload } from "jsonwebtoken";

export interface RegisterUserCredentials extends UserCredentials {
  email: string;
}

export interface UserCredentials {
  userName: string;
  password: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}
