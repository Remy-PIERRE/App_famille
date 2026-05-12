import type { User } from "@/types/User";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthService {
  login(input: LoginInput): Promise<User>;

  register(input: RegisterInput): Promise<User>;

  logout(): Promise<void>;

  getCurrentUser(): Promise<User | null>;
}
