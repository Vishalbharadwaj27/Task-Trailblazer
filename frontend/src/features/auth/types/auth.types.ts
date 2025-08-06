import { User } from "@/lib/types";

export interface AuthResponse {
  user: User;
  token: string;
}