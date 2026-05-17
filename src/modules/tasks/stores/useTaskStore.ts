import { defineStore } from "pinia";
import type { Task } from "../types/task";
import type { TaskFormValues } from "../types/taskForm";
import { taskService } from "../services";
import { useHouseholdStore } from "@/stores/useHouseholdStore";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
    unsubscribe: null as null | (() => void),
  }),

  getters: {
    todayTasks: (state) => {
      return state.tasks.filter((t) => t.status !== "done");
    },

    doneTasks: (state) => {
      return state.tasks.filter((t) => t.status === "done");
    },

    getTaskById: (state) => (id: string) => {
      return state.tasks.find((t) => t.id === id);
    },
  },

  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;

      try {
        const householdId = getCurrentHouseholdId();
        this.tasks = await taskService.getTasks(householdId);
      } catch (err) {
        console.error(err);

        this.error = "Impossible de charger les tâches.";
      } finally {
        this.loading = false;
      }
    },

    async createTask(values: TaskFormValues) {
      try {
        const householdId = getCurrentHouseholdId();
        const createdTask = await taskService.createTask(householdId, values);

        /**
         * optimistic local update
         */

        this.tasks.unshift(createdTask);
      } catch (err) {
        console.error(err);

        this.error = "Impossible de créer la tâche.";
      }
    },

    async updateTask(taskId: string, values: Partial<TaskFormValues>) {
      try {
        const householdId = getCurrentHouseholdId();
        await taskService.updateTask(householdId, taskId, values);

        const task = this.getTaskById(taskId);

        if (!task) {
          return;
        }

        this.tasks = this.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                ...values,
              }
            : t,
        );
      } catch (err) {
        console.error(err);

        this.error = "Impossible de modifier la tâche.";
      }
    },

    async completeTask(taskId: string) {
      /**
       * optimistic update
       */

      const task = this.getTaskById(taskId);

      if (!task) {
        return;
      }

      const previousStatus = task.status;

      this.tasks = this.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: "done",
            }
          : t,
      );

      try {
        const householdId = getCurrentHouseholdId();
        await taskService.completeTask(householdId, taskId);
      } catch (err) {
        console.error(err);

        /**
         * rollback
         */

        task.status = previousStatus;

        this.error = "Impossible de terminer la tâche.";
      }
    },

    subscribeToTasks() {
      const householdId = getCurrentHouseholdId();

      this.unsubscribe?.();

      this.unsubscribe = taskService.subscribeToTasks(
        householdId,
        (nextTasks) => {
          this.tasks = nextTasks;
          this.loading = false;
        },
      );
    },

    stopTasksSubscription() {
      this.unsubscribe?.();
      this.unsubscribe = null;
    },
  },
});

function getCurrentHouseholdId() {
  const householdStore = useHouseholdStore();

  const householdId = householdStore.householdId;

  if (!householdId) {
    throw new Error("No active household");
  }

  return householdId;
}
