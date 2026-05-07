import type { User } from "@/types/User";

export interface AuthService {
  login(name: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
