<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import { useAppStore } from "@/stores/useAppStore";

const appStore = useAppStore();
</script>

<template>
  <transition name="slide">
    <div v-if="appStore.updateAvailable" class="banner">
      <span>Nouvelle version disponible</span>

      <BaseButton label="Mettre à jour" @click="appStore.applyUpdate" />
    </div>
  </transition>
</template>

<style scoped>
.banner {
  position: fixed;

  bottom: 16px;
  left: 16px;
  right: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px;

  background: white;

  border: 1px solid var(--color-gray-medium);

  border-radius: 12px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  z-index: 1000;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
