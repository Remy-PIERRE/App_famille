<script setup lang="ts">
interface Props {
  tasksCount: number;
}

defineProps<Props>();
</script>

<template>
  <section class="tasks-hero">
    <p class="tasks-hero__eyebrow">Bonjour 👋</p>

    <h1 class="tasks-hero__title">{{ tasksCount }} tâches aujourd’hui</h1>
  </section>
</template>

<style scoped>
.tasks-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.tasks-hero__eyebrow {
  color: var(--color-muted);

  font-size: 0.95rem;
}

.tasks-hero__title {
  color: var(--color-text);

  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
}
</style>
