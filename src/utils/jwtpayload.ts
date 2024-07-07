import { Role } from "./enum";

export type jwtPayload = {
  name: string;
  email: string;
  role: Role;
};
