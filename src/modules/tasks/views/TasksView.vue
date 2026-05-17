<script setup lang="ts">
import { computed, onMounted } from "vue";

import AppPageLayout from "@/ui/layout/AppPageLayout.vue";

import TaskList from "../components/task-list/TaskList.vue";
import TasksHero from "../components/section/TasksHero.vue";
import TaskQuickActions from "../components/quick-actions/TaskQuickActions.vue";
import FloatingActionButton from "@/ui/components/mobile-ux/FloatingActionButton.vue";
import { useTasksStore } from "../stores/useTaskStore";
import { useRouter } from "vue-router";

const router = useRouter();
const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.subscribeToTasks();
});

const todayTasks = computed(() => tasksStore.todayTasks);
const overdueTasks = computed(() => []);

function handleCreateTask() {
  router.push("/tasks/new");
}

async function handleCompleteTask(taskId: string) {
  await tasksStore.completeTask(taskId);
}
</script>

<template>
  <AppPageLayout class="tasks-view">
    <div class="tasks-view__content">
      <TasksHero :tasks-count="todayTasks.length" />

      <TaskQuickActions />

      <TaskList
        title="Aujourd’hui"
        :tasks="todayTasks"
        @complete="handleCompleteTask"
      />

      <TaskList
        title="En retard"
        :tasks="overdueTasks"
        empty-message="Aucune tâche en retard ✨"
      />
    </div>

    <FloatingActionButton label="+" @click="handleCreateTask" />
  </AppPageLayout>
</template>

<style scoped>
.tasks-view {
  min-height: 100%;
}

.tasks-view__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  padding-bottom: 96px;
}
</style>
