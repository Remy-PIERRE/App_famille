<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";
import BaseAvatar from "@/ui/components/base/BaseAvatar.vue";

const authStore = useAuthStore();
</script>

<template>
  <header class="header">
    <div class="left">
      <BaseAvatar class="avatar">M</BaseAvatar>

      <div class="text">
        <h1>Mon foyer</h1>
        <p>Organisation familiale</p>
      </div>

      <button
        style="position: absolute; right: 20px"
        @click="authStore.logout()"
      >
        OUT
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: var(--space-4);

  display: flex;
  align-items: center;

  justify-content: space-between;

  background: var(--color-surface);
  backdrop-filter: var(--blur-md);

  border-bottom: 1px solid var(--color-border);
}

.left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.avatar {
  width: 38px;
  height: 38px;

  background: var(--color-primary);
  color: white;

  font-weight: 700;
}

.text h1 {
  margin: 0;

  font-size: 16px;
  font-weight: 700;

  color: var(--color-text);
}

.text p {
  margin: 0;

  font-size: 12px;
  color: var(--color-muted);
}
</style>
