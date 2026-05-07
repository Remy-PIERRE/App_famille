import type { Product } from "@/types/Product";

export interface ProductService {
  getAll(): Promise<Product[]>;
  add(name: string): Promise<Product>;
}
