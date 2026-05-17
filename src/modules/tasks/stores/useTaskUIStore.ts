import { defineStore } from "pinia";

export const useTaskUIStore = defineStore("tasks", {
  state: () => ({
    selectedTaskId: undefined,
    activeFilter: undefined,
    groupeMode: undefined,
    showCompleted: undefined,
  }),
});
