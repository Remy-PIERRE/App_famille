<script setup lang="ts">
import { useRouter } from "vue-router";

import BaseSurface from "@/ui/components/base/BaseSurface.vue";

import type { Task } from "../../types/task";

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  complete: [taskId: string];
}>();

const router = useRouter();

function navigateToDetails() {
  router.push(`/tasks/${props.task.id}`);
}

function handleComplete() {
  emit("complete", props.task.id);
}
</script>

<template>
  <BaseSurface
    class="task-card"
    role="button"
    tabindex="0"
    @click="navigateToDetails"
  >
    <button
      class="task-card__checkbox"
      type="button"
      aria-label="Terminer la tâche"
      @click.stop="handleComplete"
    />

    <div class="task-card__content">
      <p class="task-card__title">
        {{ task.title }}
      </p>

      <div class="task-card__meta">
        <span class="task-card__priority">
          {{ task.priority }}
        </span>
      </div>
    </div>
  </BaseSurface>
</template>

<style scoped>
.task-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);

  padding: var(--space-4);

  border-radius: var(--radius-xl);

  cursor: pointer;

  transition: var(--transition);

  -webkit-tap-highlight-color: transparent;
}

.task-card:active {
  transform: scale(0.99);
}

.task-card__checkbox {
  width: 22px;
  height: 22px;

  border-radius: 999px;

  border: 2px solid var(--color-primary);

  background: transparent;

  flex-shrink: 0;

  cursor: pointer;
}

.task-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  min-width: 0;
}

.task-card__title {
  color: var(--color-text);

  font-weight: 600;

  line-height: 1.4;
}

.task-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.task-card__priority {
  color: var(--color-primary-soft);

  font-size: 0.85rem;
  font-weight: 600;
}
</style>
