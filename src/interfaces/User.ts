import type { Role } from "./Role";

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: Role;  
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
  role: Role;
}
