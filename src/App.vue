<script setup lang="ts">
import { RouterView } from "vue-router";
import { useProductStore } from "./stores/useProductStore";
import { useRecipeStore } from "./stores/useRecipeStore";
import { useShoppingStore } from "./stores/useShoppingStore";
import { onMounted } from "vue";
import UpdateBanner from "@/components/ui/UpdateBanner.vue";

const productStore = useProductStore();

const recipeStore = useRecipeStore();

const shoppingStore = useShoppingStore();

onMounted(() => {
  productStore.fetch();
  recipeStore.fetch();
  shoppingStore.fetch();
});
</script>

<template>
  <main>
    <RouterView />

    <UpdateBanner />
  </main>
</template>
