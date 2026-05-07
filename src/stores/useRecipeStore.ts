import { recipeService } from "@/services";
import type { Recipe } from "@/types/Recipe";
import { defineStore } from "pinia";

export const useRecipeStore = defineStore("recipes", {
  state: () => ({
    recipes: [] as Recipe[],
  }),

  actions: {
    async fetch() {
      this.recipes = await recipeService.getAll();
    },

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
    },

    updateRecipe(updated: Recipe) {
      const index = this.recipes.findIndex((r) => r.id === updated.id);
      if (index !== -1) {
        this.recipes[index] = updated;
      }
    },
  },

  getters: {
    getById: (state) => (id: string) => state.recipes.find((r) => r.id === id),
  },
});
