import type { Permissions } from "./Permissions.ts";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permissions[];
}