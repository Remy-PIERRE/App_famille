<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppPageLayout from "@/ui/layout/AppPageLayout.vue";

import TaskForm from "../components/task-form/TaskForm.vue";
import { TASK_PRIORITY } from "../types/taskPriority";
import type { TaskFormValues } from "../types/taskForm";
import { useTasksStore } from "../stores/useTaskStore";

const route = useRoute();
const router = useRouter();
const tasksStore = useTasksStore();

const loading = ref(false);

const isEditMode = computed(() => {
  return typeof route.params.id === "string";
});

/**
 * TODO:
 * remplacer plus tard
 * par données store/service
 */
const initialValues = computed(() => {
  if (!isEditMode.value) {
    return {
      title: "",
      priority: TASK_PRIORITY.MEDIUM,
      description: "",
    };
  }

  return {
    title: "Sortir les poubelles",
    priority: TASK_PRIORITY.HIGH,
    description: "",
  };
});

const pageTitle = computed(() => {
  return isEditMode.value ? "Modifier la tâche" : "Nouvelle tâche";
});

const submitLabel = computed(() => {
  return isEditMode.value ? "Enregistrer" : "Créer la tâche";
});

async function handleSubmit(values: TaskFormValues) {
  loading.value = true;

  try {
    if (isEditMode.value) {
      await tasksStore.updateTask(String(route.params.id), values);
    } else {
      await tasksStore.createTask(values);
    }

    await router.push("/tasks");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AppPageLayout>
    <div class="task-form-view">
      <header class="task-form-view__header">
        <h1 class="task-form-view__title">
          {{ pageTitle }}
        </h1>
      </header>

      <TaskForm
        :initial-values="initialValues"
        :loading="loading"
        :submit-label="submitLabel"
        @submit="handleSubmit"
      />
    </div>
  </AppPageLayout>
</template>

<style scoped>
.task-form-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  min-height: 100%;
}

.task-form-view__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-form-view__title {
  color: var(--color-text);

  font-size: 1.5rem;
  font-weight: 700;

  line-height: 1.2;
}
</style>
