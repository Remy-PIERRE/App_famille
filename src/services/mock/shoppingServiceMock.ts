import type { ShoppingService } from "@/types/services/ShoppingService";
import { mockShopping } from "./shoppingMock";
import type { ShoppingItem } from "@/types/ShoppingItem";

export const shoppingServiceMock: ShoppingService = {
  async getAll() {
    return [...mockShopping];
  },

  async add(item: ShoppingItem) {
    mockShopping.push(item);
  },
};
