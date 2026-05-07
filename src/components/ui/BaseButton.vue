<script setup lang="ts">
defineProps<{
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}>();
</script>

<template>
  <button
    class="btn"
    :class="[`btn--${variant || 'primary'}`]"
    :disabled="disabled || loading"
  >
    <span v-if="loading">...</span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 16px;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: var(--color-secondary);
}

.btn--secondary {
  background: var(--color-gray-light);
  color: var(--color-gray-dark);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
