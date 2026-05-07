import type { Product } from "@/types/Product";
import { ref } from "vue";

const products = ref<Product[]>([]);

export function useProducts() {
  function addProduct(name: string) {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      defaultUnit: "unit",
    };

    products.value.push(newProduct);
    return newProduct;
  }

  function findProductByName(name: string) {
    return products.value.find(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
  }

  return {
    products,
    addProduct,
    findProductByName,
  };
}
