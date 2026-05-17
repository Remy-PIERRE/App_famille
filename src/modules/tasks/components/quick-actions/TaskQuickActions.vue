<script setup lang="ts">
const actions = [
  {
    label: "Mes tâches",
  },
  {
    label: "Famille",
  },
  {
    label: "Courses",
  },
];
</script>

<template>
  <section class="quick-actions">
    <button
      v-for="action in actions"
      :key="action.label"
      class="quick-actions__item"
      type="button"
    >
      {{ action.label }}
    </button>
  </section>
</template>

<style scoped>
.quick-actions {
  display: flex;
  gap: var(--space-3);

  overflow-x: auto;

  padding-bottom: var(--space-1);
}

.quick-actions::-webkit-scrollbar {
  display: none;
}

.quick-actions__item {
  flex-shrink: 0;

  border: 1px solid var(--color-border);

  background: var(--color-surface);

  backdrop-filter: var(--blur-md);

  border-radius: var(--radius-lg);

  padding: var(--space-3) var(--space-4);

  color: var(--color-text);

  font-weight: 600;

  box-shadow: var(--shadow-soft);

  transition: var(--transition);
}

.quick-actions__item:active {
  transform: scale(0.98);
}
</style>
