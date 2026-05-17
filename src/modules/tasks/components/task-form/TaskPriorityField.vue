<script setup lang="ts">
import { TASK_PRIORITY, type TaskPriority } from "../../types/taskPriority";

interface Props {
  modelValue: TaskPriority;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: TaskPriority];
}>();

const priorities = [
  {
    label: "Basse",
    value: TASK_PRIORITY.LOW,
  },
  {
    label: "Normale",
    value: TASK_PRIORITY.MEDIUM,
  },
  {
    label: "Haute",
    value: TASK_PRIORITY.HIGH,
  },
];
</script>

<template>
  <div class="field">
    <label class="field__label"> Priorité </label>

    <div class="priority-list">
      <button
        v-for="priority in priorities"
        :key="priority.value"
        type="button"
        class="priority-item"
        :class="{
          'priority-item--active': modelValue === priority.value,
        }"
        @click="emit('update:modelValue', priority.value)"
      >
        {{ priority.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.field__label {
  color: var(--color-text);

  font-size: 0.95rem;
  font-weight: 600;
}

.priority-list {
  display: flex;
  gap: var(--space-3);
}

.priority-item {
  flex: 1;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-lg);

  background: var(--color-surface);

  padding: 14px 12px;

  color: var(--color-text);

  font-weight: 600;

  transition: var(--transition);

  box-shadow: var(--shadow-soft);
}

.priority-item--active {
  background: var(--color-active-bg);

  border-color: rgba(53, 92, 77, 0.2);

  color: var(--color-primary);
}
</style>
