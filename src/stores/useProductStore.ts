import { productService } from "@/services";
import type { Product } from "@/types/Product";
import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
  }),

  actions: {
    async fetch() {
      this.products = await productService.getAll();
    },

    async addProduct(name: string) {
      const product = await productService.add(name);
      this.products.push(product);
      return product;
    },

    search(query: string) {
      return this.products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    },
  },
});
