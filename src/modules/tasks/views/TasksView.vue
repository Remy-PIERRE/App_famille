<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/stores/useTaskStore";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { statusColor } from "@/assets/const/task";
import type { Task } from "@/types/Task";

const store = useTaskStore();

onMounted(() => {
  store.fetch();
});

const newTask = ref("");

const filterStatus = ref("");
const filterPriority = ref("");

const tasks = computed(() =>
  store.filteredTasks({
    status: filterStatus.value || undefined,
    priority: filterPriority.value || undefined,
  }),
);

function addTask() {
  if (!newTask.value) return;

  store.add({
    id: crypto.randomUUID(),
    title: newTask.value,
    status: "todo",
    priority: "medium",
  });

  newTask.value = "";
}

function toggleStatus(task: Task) {
  const next =
    task.status === "todo"
      ? "in_progress"
      : task.status === "in_progress"
        ? "done"
        : "todo";

  store.update({ ...task, status: next });
}
</script>

<template>
  <div class="page">
    <h1>Tâches</h1>

    <!-- ajout -->
    <BaseCard>
      <div class="add">
        <BaseInput v-model="newTask" placeholder="Nouvelle tâche" />
        <BaseButton label="Ajouter" @click="addTask" />
      </div>
    </BaseCard>

    <!-- filtres -->
    <BaseCard>
      <div class="filters">
        <select v-model="filterStatus">
          <option value="">Tous statuts</option>
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminé</option>
        </select>

        <select v-model="filterPriority">
          <option value="">Toutes priorités</option>
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
      </div>
    </BaseCard>

    <!-- liste -->
    <BaseCard
      v-for="task in tasks"
      :key="task.id"
      class="task"
      @click="toggleStatus(task)"
    >
      <div class="row">
        <span class="title">{{ task.title }}</span>

        <span class="status" :style="{ background: statusColor[task.status] }">
          {{ task.status }}
        </span>
      </div>
    </BaseCard>

    <p v-if="!tasks.length" class="empty">Aucune tâche</p>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.add {
  display: flex;
  gap: 8px;
}

.filters {
  display: flex;
  gap: 8px;
}

.task {
  cursor: pointer;
}

.row {
  display: flex;
  justify-content: space-between;
}

.status {
  padding: 4px 8px;
  border-radius: 8px;
  color: white;
  font-size: 12px;
}

.empty {
  text-align: center;
  color: var(--color-gray-dark);
}
</style>
