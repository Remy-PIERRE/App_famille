<script setup lang="ts">
import TaskCard from "../task-card/TaskCard.vue";

import type { Task } from "../../types/task.ts";

interface Props {
  title: string;
  tasks: Task[];
  emptyMessage?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  complete: [taskId: string];
}>();
</script>

<template>
  <section class="task-section">
    <div class="task-section__header">
      <h2 class="task-section__title">
        {{ title }}
      </h2>
    </div>

    <div v-if="tasks.length" class="task-section__list">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="emit('complete', $event)"
      />
    </div>

    <div v-else class="task-section__empty">
      {{ emptyMessage }}
    </div>
  </section>
</template>

<style scoped>
.task-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.task-section__title {
  color: var(--color-text);

  font-size: 1.1rem;
  font-weight: 700;
}

.task-section__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.task-section__empty {
  color: var(--color-muted);

  font-size: 0.95rem;

  padding-left: var(--space-2);
}
</style>
