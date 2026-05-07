<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: white;
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}
</style>
