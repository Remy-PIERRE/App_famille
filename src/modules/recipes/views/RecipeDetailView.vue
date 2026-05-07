<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { useShoppingStore } from "@/stores/useShoppingStore";
import { ingredientToShoppingItem } from "@/mappers/shopping";

const route = useRoute();
const recipeStore = useRecipeStore();
const shoppingStore = useShoppingStore();

const recipe = computed(() => recipeStore.getById(route.params.id as string));

function addToShoppingList() {
  if (!recipe.value) return;

  recipe.value.ingredients.forEach((ingredient) => {
    shoppingStore.addItem(ingredientToShoppingItem(ingredient));
  });
}
</script>

<template>
  <div class="page" v-if="recipe">
    <!-- header -->
    <div class="header">
      <h1>{{ recipe.name }}</h1>

      <div class="actions">
        <BaseButton variant="secondary" label="Modifier" />

        <BaseButton label="Ajouter aux courses" @click="addToShoppingList" />
      </div>
    </div>

    <!-- ingrédients -->
    <BaseCard>
      <h2>Ingrédients</h2>

      <ul class="ingredients">
        <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
          <span class="quantity">
            {{ ingredient.quantity }} {{ ingredient.unit }}
          </span>

          <span class="name">
            {{ ingredient.name }}
          </span>
        </li>
      </ul>
    </BaseCard>
  </div>

  <!-- fallback -->
  <p v-else class="empty">Recette introuvable</p>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.actions {
  display: flex;
  gap: 8px;
}

.ingredients {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ingredients li {
  display: flex;
  gap: 8px;
  align-items: center;
}

.quantity {
  font-weight: 600;
  color: var(--color-primary);
}

.name {
  color: var(--color-gray-dark);
}

.empty {
  text-align: center;
  margin-top: 40px;
  color: var(--color-gray-dark);
}
</style>
