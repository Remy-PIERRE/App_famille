<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppPageLayout from "@/ui/layout/AppPageLayout.vue";

import TaskDetailsHeader from "../components/task-details/TaskDetailsHeader.vue";
import TaskMetaList from "../components/task-details/TaskMetaList.vue";
import TaskDescription from "../components/task-details/TaskDescription.vue";
import TaskDetailsActions from "../components/task-details/TaskDetailsActions.vue";
import { useTasksStore } from "../stores/useTaskStore";

const route = useRoute();
const router = useRouter();
const tasksStore = useTasksStore();

const task = computed(() => tasksStore.getTaskById(String(route.params.id)));

const metaItems = computed(() => [
  {
    label: "Priorité",
    value: task.value?.priority,
  },
  {
    label: "Assignée à",
    value: "Emma",
  },
  {
    label: "Échéance",
    value: "Aujourd’hui",
  },
]);

function handleEdit() {
  router.push(`/tasks/${task.value?.id}/edit`);
}

function handleComplete() {
  console.log("complete task");
}
</script>

<template>
  <AppPageLayout>
    <div class="task-detail-view">
      <TaskDetailsHeader :task="task" />

      <TaskMetaList :items="metaItems" />

      <TaskDescription :description="task.description" />

      <TaskDetailsActions @edit="handleEdit" @complete="handleComplete" />
    </div>
  </AppPageLayout>
</template>

<style scoped>
.task-detail-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  min-height: 100%;
}
</style>
