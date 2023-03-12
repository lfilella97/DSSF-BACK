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

export interface Structure {
  name: string;
  owner: string;
  type: string;
  coordenateX: string;
  coordenateY: string;
  elevation: string;
  creationTime: string;
  description: string;
}

export type Structures = Structure[];
