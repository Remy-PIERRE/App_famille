import type { Ingredient } from "./Ingredient";

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}
