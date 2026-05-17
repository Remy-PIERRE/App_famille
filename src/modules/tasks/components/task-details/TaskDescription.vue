<script setup lang="ts">
interface Props {
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <section v-if="description" class="task-description">
    <h2 class="task-description__title">Description</h2>

    <p class="task-description__content">
      {{ description }}
    </p>
  </section>
</template>

<style scoped>
.task-description {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.task-description__title {
  color: var(--color-text);

  font-size: 1rem;
  font-weight: 700;
}

.task-description__content {
  color: var(--color-muted);

  line-height: 1.6;
}
</style>
