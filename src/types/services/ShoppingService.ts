import type { ShoppingItem } from "@/types/ShoppingItem";

export interface ShoppingService {
  getAll(): Promise<ShoppingItem[]>;
  add(item: ShoppingItem): Promise<void>;
}
