import { defineStore } from "pinia";
import { authService } from "@/services";
import type { User } from "@/types/User";

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

    async login(name: string) {
      this.user = await authService.login(name);
    },

    async logout() {
      await authService.logout();
      this.user = null;
    },
  },
});
