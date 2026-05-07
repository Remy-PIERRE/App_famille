<script setup lang="ts">
import { ref, computed } from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { useProductStore } from "@/stores/useProductStore";

const productStore = useProductStore();

const newIngredient = ref("");

function addIngredient() {
  if (!newIngredient.value.trim()) return;

  productStore.addProduct(newIngredient.value);

  newIngredient.value = "";
}

// 🔍 optionnel : tri / affichage propre
const products = computed(() => productStore.products);
</script>

<template>
  <div class="ingredients-page">
    <h1>Produits</h1>

    <BaseCard>
      <div class="add">
        <BaseInput
          v-model="newIngredient"
          placeholder="Nouveau produit (ex: jambon)"
        />

        <button @click="addIngredient">Ajouter</button>
      </div>
    </BaseCard>

    <BaseCard v-for="product in products" :key="product.id">
      {{ product.name }}
    </BaseCard>

    <p v-if="!products.length" class="empty">Aucun produit</p>
  </div>
</template>

<style scoped>
.ingredients-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.add {
  display: flex;
  gap: 8px;
}

.empty {
  text-align: center;
  color: var(--color-gray-dark);
}
</style>
