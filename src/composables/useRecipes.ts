import type { Recipe } from "@/types/Recipe";
import { ref } from "vue";

const recipes = ref<Recipe[]>([]);

export function useRecipes() {
  function addRecipe(recipe: Recipe) {
    recipes.value.push(recipe);
  }

  return {
    recipes,
    addRecipe,
  };
}
