<script setup lang="ts">
interface MetaItem {
  label: string;
  value: string;
}

interface Props {
  items: MetaItem[];
}

defineProps<Props>();
</script>

<template>
  <section class="meta-list">
    <div v-for="item in items" :key="item.label" class="meta-list__item">
      <span class="meta-list__label">
        {{ item.label }}
      </span>

      <span class="meta-list__value">
        {{ item.value }}
      </span>
    </div>
  </section>
</template>

<style scoped>
.meta-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.meta-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-lg);

  background: var(--color-surface);

  padding: 14px 16px;

  box-shadow: var(--shadow-soft);
}

.meta-list__label {
  color: var(--color-muted);

  font-size: 0.95rem;
}

.meta-list__value {
  color: var(--color-text);

  font-weight: 600;
}
</style>
