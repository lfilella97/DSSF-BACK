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
  isAdmin: boolean;
}
