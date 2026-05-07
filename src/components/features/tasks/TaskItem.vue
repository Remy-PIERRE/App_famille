<script setup lang="ts">
import type { Task } from "@/composables/useTasks";

defineProps<{
  task: Task;
}>();

const emit = defineEmits(["toggle"]);
</script>

<template>
  <div class="task" @click="emit('toggle', task.id)">
    <input type="checkbox" :checked="task.done" />
    <span :class="{ done: task.done }">
      {{ task.title }}
    </span>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.done {
  text-decoration: line-through;
  color: var(--color-gray);
}
</style>
