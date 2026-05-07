<script setup lang="ts">
import { ref, computed } from "vue";
import RecipeCard from "@/components/features/recipes/RecipeCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import RecipeEditor from "@/components/features/recipes/RecipeEditor.vue";
import type { Recipe } from "@/types/Recipe";
import { useRecipeStore } from "@/stores/useRecipeStore";
import IngredientsView from "./IngredientsView.vue";

const recipeStore = useRecipeStore();

const search = ref("");
const showEditor = ref(false);

// 👇 onglets
const activeTab = ref<"recipes" | "ingredients">("recipes");

function handleSave(recipe: Recipe) {
  recipeStore.addRecipe(recipe);
  showEditor.value = false;
}

// 🔍 filtrage simple
const filteredRecipes = computed(() =>
  recipeStore.recipes.filter((r) =>
    r.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
);
</script>

<template>
  <div class="page">
    <!-- TABS -->
    <div class="tabs">
      <button
        :class="{ active: activeTab === 'recipes' }"
        @click="activeTab = 'recipes'"
      >
        Recettes
      </button>

      <button
        :class="{ active: activeTab === 'ingredients' }"
        @click="activeTab = 'ingredients'"
      >
        Ingrédients
      </button>
    </div>

    <!-- CONTENU -->
    <template v-if="activeTab === 'recipes'">
      <div class="header">
        <h1>Recettes</h1>

        <BaseButton @click="showEditor = true" label="Nouvelle recette" />
      </div>

      <RecipeEditor
        v-if="showEditor"
        @save="handleSave"
        @cancel="showEditor = false"
      />

      <BaseCard>
        <BaseInput v-model="search" placeholder="Rechercher une recette..." />
      </BaseCard>

      <div class="list">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>

      <p v-if="!filteredRecipes.length" class="empty">Aucune recette</p>
    </template>

    <!-- INGREDIENTS -->
    <template v-else>
      <IngredientsView />
    </template>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* TABS */
.tabs {
  display: flex;
  gap: 8px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border-radius: var(--radius);
  border: 1px solid var(--color-gray);
  background: white;
  cursor: pointer;
  transition: var(--transition);
}

.tabs button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty {
  text-align: center;
  color: var(--color-gray-dark);
  opacity: 0.6;
}
</style>
