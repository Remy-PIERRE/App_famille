<script setup lang="ts">
import type { TaskStatus } from "../../types/taskStatus";

interface Props {
  status: TaskStatus;
}

defineProps<Props>();

const labels: Record<TaskStatus, string> = {
  todo: "À faire",
  in_progress: "En cours",
  done: "Terminée",
  canceled: "Annulé",
};
</script>

<template>
  <div class="status-badge" :class="`status-badge--${status}`">
    {{ labels[status] }}
  </div>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;

  width: fit-content;

  border-radius: 999px;

  padding: 8px 12px;

  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge--todo {
  background: rgba(53, 92, 77, 0.08);

  color: var(--color-primary);
}

.status-badge--in_progress {
  background: rgba(180, 140, 60, 0.12);

  color: #8a6a2f;
}

.status-badge--done {
  background: rgba(80, 120, 90, 0.12);

  color: #4f7a5c;
}
</style>
