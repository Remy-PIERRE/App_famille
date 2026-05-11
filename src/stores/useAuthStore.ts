import { defineStore } from "pinia";
import { authService } from "@/services";
import type { User } from "@/types/User";
import type { LoginInput } from "@/types/services/AuthService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async init() {
      this.loading = true;
      this.user = await authService.getCurrentUser();
      this.loading = false;
    },

    async login(input: LoginInput) {
      this.user = await authService.login(input);
    },

    async logout() {
      await authService.logout();
      this.user = null;
    },
  },
});
