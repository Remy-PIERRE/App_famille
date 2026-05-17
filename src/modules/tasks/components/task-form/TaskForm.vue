<script setup lang="ts">
import { reactive, computed } from "vue";

import BaseButton from "@/ui/components/base/BaseButton.vue";

import TaskTitleField from "./TaskTitleField.vue";
import TaskPriorityField from "./TaskPriorityField.vue";
import type { TaskFormValues } from "../../types/taskForm";
import { TASK_PRIORITY } from "../../types/taskPriority";

interface Props {
  initialValues?: Partial<TaskFormValues>;

  loading?: boolean;

  submitLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({
    title: "",
    priority: TASK_PRIORITY.MEDIUM,
    description: "",
  }),

  loading: false,

  submitLabel: "Créer la tâche",
});

const emit = defineEmits<{
  submit: [values: TaskFormValues];
}>();

const form = reactive<TaskFormValues>({
  title: props.initialValues.title ?? "",

  priority: props.initialValues.priority ?? TASK_PRIORITY.MEDIUM,

  description: props.initialValues.description ?? "",
});

const isValid = computed(() => {
  return form.title.trim().length > 0;
});

function handleSubmit() {
  if (!isValid.value) {
    return;
  }

  emit("submit", {
    ...form,
  });
}
</script>

<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <div class="task-form__content">
      <TaskTitleField v-model="form.title" />

      <TaskPriorityField v-model="form.priority" />
    </div>

    <div class="task-form__footer">
      <BaseButton type="submit" :disabled="!isValid || loading" full-width>
        {{ submitLabel }}
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;

  min-height: 100%;
}

.task-form__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);

  padding-bottom: 120px;
}

.task-form__footer {
  position: sticky;

  bottom: 0;

  padding-top: var(--space-4);

  background: linear-gradient(
    to top,
    var(--color-bg),
    rgba(246, 244, 239, 0.7)
  );

  backdrop-filter: var(--blur-md);
}
</style>
