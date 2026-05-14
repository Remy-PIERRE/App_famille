import { defineStore } from "pinia";

import { authService } from "@/services";

import type { User } from "@/types/User";

import type { LoginInput, RegisterInput } from "@/types/services/AuthService";
import { useHouseholdStore } from "./useHouseholdStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isLoading: false,
    isReady: false,
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.user;
    },

    householdId: (state) => {
      return state.user?.householdId ?? null;
    },

    needsOnboarding(): boolean {
      return this.isAuthenticated && !this.householdId;
    },
  },

  actions: {
    async init() {
      try {
        this.isLoading = true;

        this.user = await authService.getCurrentUser();
      } finally {
        this.isReady = true;
        this.isLoading = false;
      }
    },

    async login(input: LoginInput) {
      try {
        this.isLoading = true;

        this.user = await authService.login(input);

        const householdStore = useHouseholdStore();
        await householdStore.init();
      } finally {
        this.isLoading = false;
      }
    },

    async register(input: RegisterInput) {
      try {
        this.isLoading = true;

        this.user = await authService.register(input);
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        this.isLoading = true;

        await authService.logout();
        this.user = null;
      } finally {
        this.isLoading = false;
      }
    },

    setUser(user: User | null) {
      this.user = user;
    },
  },
});
