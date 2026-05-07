import type { RecipeService } from "@/types/services/RecipeService";
import { mockRecipes } from "./recipeMock";
import type { Recipe } from "@/types/Recipe";

export const recipeServiceMock: RecipeService = {
  async getAll() {
    return [...mockRecipes];
  },

  async add(recipe: Recipe) {
    mockRecipes.push(recipe);
  },
};
