<script setup lang="ts">
import type { Task } from "../../types/task";
import TaskStatusBadge from "./TaskStatusBadge.vue";

interface Props {
  task: Task;
}

defineProps<Props>();
</script>

<template>
  <header class="task-detail-header">
    <div class="task-detail-header__top">
      <TaskStatusBadge :status="task.status" />
    </div>

    <h1 class="task-detail-header__title">
      {{ task.title }}
    </h1>
  </header>
</template>

<style scoped>
.task-detail-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.task-detail-header__top {
  display: flex;
  align-items: center;
}

.task-detail-header__title {
  color: var(--color-text);

  font-size: 1.8rem;
  font-weight: 700;

  line-height: 1.2;
}
</style>
