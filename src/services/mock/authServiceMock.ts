import type { AuthService, LoginInput } from "@/types/services/AuthService";
import type { User } from "@/types/User";

let currentUser: User | null = null;

export const authServiceMock: AuthService = {
  async login(input: LoginInput) {
    currentUser = {
      id: crypto.randomUUID(),
      email: input.email,
    };

    localStorage.setItem("user", JSON.stringify(currentUser));

    return currentUser;
  },

  async logout() {
    currentUser = null;
    localStorage.removeItem("user");
  },

  async getCurrentUser() {
    if (currentUser) return currentUser;

    const saved = localStorage.getItem("user");
    if (saved) {
      currentUser = JSON.parse(saved);
      return currentUser;
    }

    return null;
  },
};
