import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    updateAvailable: false,
    updateSW: null as null | ((reloadPage?: boolean) => void),
  }),

  actions: {
    setUpdateAvailable(callback: (reloadPage?: boolean) => void) {
      this.updateAvailable = true;
      this.updateSW = callback;
    },

    applyUpdate() {
      if (!this.updateSW) return;

      this.updateSW(true);
      this.updateAvailable = false;
    },
  },
});
