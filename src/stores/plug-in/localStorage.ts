import type { PiniaPluginContext } from "pinia";

export function localStoragePlugin({ store }: PiniaPluginContext) {
  const key = `app-${store.$id}`;

  // 🔄 hydrate
  const saved = localStorage.getItem(key);
  if (saved) {
    store.$patch(JSON.parse(saved));
  }

  // 💾 save
  store.$subscribe((_, state) => {
    localStorage.setItem(key, JSON.stringify(state));
  });
}
