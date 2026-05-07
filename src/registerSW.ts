import { registerSW } from "virtual:pwa-register";
import { useAppStore } from "@/stores/useAppStore";

export function setupPWA() {
  const appStore = useAppStore();

  const updateSW = registerSW({
    immediate: true,

    onNeedRefresh() {
      appStore.setUpdateAvailable(updateSW);
    },

    onOfflineReady() {
      console.log("✅ App prête offline");
    },
  });
}
