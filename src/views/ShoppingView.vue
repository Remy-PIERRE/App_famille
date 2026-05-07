<script setup lang="ts">
import { computed } from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useShoppingStore } from "@/stores/useShoppingStore";

const shoppingStore = useShoppingStore();

const items = computed(() => shoppingStore.items);
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Liste de courses</h1>

      <BaseButton
        variant="secondary"
        label="Vider"
        @click="shoppingStore.clear()"
      />
    </div>

    <BaseCard v-for="item in items" :key="item.id">
      <div class="item">
        <span class="name">{{ item.name }}</span>

        <span class="qty"> {{ item.quantity }} {{ item.unit }} </span>

        <BaseButton
          variant="secondary"
          label="Supprimer"
          @click="shoppingStore.removeItem(item.id)"
        />
      </div>
    </BaseCard>

    <p v-if="!items.length" class="empty">Aucune course pour le moment</p>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.name {
  font-weight: 500;
}

.qty {
  color: var(--color-primary);
}

.empty {
  text-align: center;
  color: var(--color-gray-dark);
}
</style>
