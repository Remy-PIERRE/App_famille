import type { TaskService } from "@/types/services/TaskService";
import { mockTasks } from "./taskMock";

export const taskServiceMock: TaskService = {
  async getAll() {
    return [...mockTasks];
  },

  async add(task) {
    mockTasks.push(task);
  },

  async update(task) {
    const index = mockTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) mockTasks[index] = task;
  },

  async remove(id) {
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index !== -1) mockTasks.splice(index, 1);
  },
};
