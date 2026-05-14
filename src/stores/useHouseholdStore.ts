import { defineStore } from "pinia";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import type { Household } from "@/modules/household/types/Household";
import { useAuthStore } from "@/stores/useAuthStore";

export const useHouseholdStore = defineStore("household", {
  state: () => ({
    currentHousehold: null as Household | null,
    isLoading: false,
    isReady: false,
  }),

  getters: {
    householdId: (state) => state.currentHousehold?.id ?? null,

    members: (state) => state.currentHousehold?.members ?? [],
  },

  actions: {
    async init() {
      const authStore = useAuthStore();

      const householdId = authStore.user?.householdId;

      if (!householdId) {
        this.currentHousehold = null;
        this.isReady = true;
        return;
      }

      await this.fetchHousehold(householdId);

      this.isReady = true;
    },

    async fetchHousehold(householdId: string) {
      try {
        this.isLoading = true;

        const ref = doc(db, "households", householdId);

        const snap = await getDoc(ref);

        if (!snap.exists()) {
          this.currentHousehold = null;
          return;
        }

        const data = snap.data();

        this.currentHousehold = {
          id: snap.id,
          name: data.name,
          inviteCode: data.inviteCode,
          members: data.members ?? [],
          createdAt: data.createdAt?.seconds ?? Date.now(),
        };
      } finally {
        this.isLoading = false;
      }
    },

    setHousehold(household: Household | null) {
      this.currentHousehold = household;
    },

    clear() {
      this.currentHousehold = null;
      this.isReady = false;
    },
  },
});
