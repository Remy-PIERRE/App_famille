import type { Ingredient } from "@/types/Ingredient";
import type { ShoppingItem } from "@/types/ShoppingItem";

export function ingredientToShoppingItem(ingredient: Ingredient): ShoppingItem {
  return {
    id: crypto.randomUUID(),

    productId: ingredient.productId,
    name: ingredient.name,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
  };
}
