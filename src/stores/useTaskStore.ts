import { defineStore } from "pinia";
import { taskService } from "@/services";
import type { Task } from "@/types/Task";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
  }),

  getters: {
    filteredTasks: (state) => {
      return (filters: {
        status?: string;
        priority?: string;
        userId?: string;
      }) => {
        return state.tasks.filter((t) => {
          return (
            (!filters.status || t.status === filters.status) &&
            (!filters.priority || t.priority === filters.priority) &&
            (!filters.userId || t.userId === filters.userId)
          );
        });
      };
    },
  },

  actions: {
    async fetch() {
      this.loading = true;
      this.tasks = await taskService.getAll();
      this.loading = false;
    },

    async add(task: Task) {
      await taskService.add(task);
      this.tasks.push(task);
    },

    async update(task: Task) {
      await taskService.update(task);

      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) this.tasks[index] = task;
    },

    async remove(id: string) {
      await taskService.remove(id);
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
  },
});
