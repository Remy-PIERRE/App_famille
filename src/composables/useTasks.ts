import { ref } from "vue";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
}

export function useTasks() {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);

  function addTask(title: string) {
    tasks.value.push({
      id: crypto.randomUUID(),
      title,
      done: false,
      createdAt: Date.now(),
    });
  }

  function toggleTask(id: string) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.done = !task.done;
  }

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
  };
}
