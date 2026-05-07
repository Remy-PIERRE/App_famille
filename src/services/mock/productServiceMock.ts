import type { ProductService } from "@/types/services/ProductService";
import { mockProducts } from "./productMock";
import type { Product } from "@/types/Product";

export const productServiceMock: ProductService = {
  async getAll() {
    return [...mockProducts];
  },

  async add(name: string) {
    const existing = mockProducts.find(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );

    if (existing) return existing;

    const product: Product = {
      id: crypto.randomUUID(),
      name,
      defaultUnit: "unit",
    };

    mockProducts.push(product);
    return product;
  },
};
