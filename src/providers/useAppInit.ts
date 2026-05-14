import { watch } from "vue";

import { useAuthStore } from "@/stores/useAuthStore";
import { useHouseholdStore } from "@/stores/useHouseholdStore";

export async function initApp() {
  const authStore = useAuthStore();

  const householdStore = useHouseholdStore();

  /* =========================
     AUTH HYDRATION
  ========================= */

  await authStore.init();

  /* =========================
     HOUSEHOLD HYDRATION
  ========================= */

  if (authStore.user?.householdId) {
    await householdStore.init();
  }

  /* =========================
     AUTH WATCHER
  ========================= */

  watch(
    () => authStore.user,
    async (user) => {
      if (!user) {
        householdStore.clear();
        return;
      }

      if (!user.householdId) {
        householdStore.clear();
        return;
      }

      await householdStore.init();
    },
  );
}
