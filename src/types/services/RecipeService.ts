import type { Recipe } from "@/types/Recipe";

export interface RecipeService {
  getAll(): Promise<Recipe[]>;
  add(recipe: Recipe): Promise<void>;
}
