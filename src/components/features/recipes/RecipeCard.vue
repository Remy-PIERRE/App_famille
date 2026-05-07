<script setup lang="ts">
import type { Recipe } from "@/types/Recipe";
import { useRouter } from "vue-router";

const props = defineProps<{
  recipe: Recipe;
}>();

const router = useRouter();

function goToDetail() {
  router.push(`/recipes/${props.recipe.id}`);
}
</script>

<template>
  <div class="card" @click="goToDetail">
    <div class="content">
      <h3>{{ recipe.name }}</h3>

      <p class="meta">{{ recipe.ingredients.length }} ingrédients</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius);
  padding: 16px;
  cursor: pointer;
  transition: var(--transition);
}

.card:hover {
  transform: translateY(-2px);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

h3 {
  font-size: 16px;
  font-weight: 600;
}

.meta {
  font-size: 13px;
  color: var(--color-gray-dark);
}
</style>
