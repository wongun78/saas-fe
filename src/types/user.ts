export type Role = "admin" | "user";
export type Gender = "male" | "female";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  address?: string;
  role: Role;
}
