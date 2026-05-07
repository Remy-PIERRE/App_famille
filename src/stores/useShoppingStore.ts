import { shoppingService } from "@/services";
import type { ShoppingItem } from "@/types/ShoppingItem";
import { defineStore } from "pinia";

export const useShoppingStore = defineStore("shopping", {
  state: () => ({
    items: [] as ShoppingItem[],
  }),

  actions: {
    async fetch() {
      this.items = await shoppingService.getAll();
    },

    addItem(item: ShoppingItem) {
      const existing = this.items.find((i) =>
        i.productId && item.productId
          ? i.productId === item.productId
          : i.name.toLowerCase() === item.name.toLowerCase(),
      );

      if (existing && existing.unit === item.unit) {
        existing.quantity += item.quantity;
        return;
      }

      this.items.push({
        productId: crypto.randomUUID(),
        ...item,
      });
    },

    removeItem(id: string) {
      this.items = this.items.filter((i) => i.productId !== id);
    },

    clear() {
      this.items = [];
    },
  },
});
