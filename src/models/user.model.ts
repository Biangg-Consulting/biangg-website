import { Role } from "@/@types/role";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}
