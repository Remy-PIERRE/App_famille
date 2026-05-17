import type { TaskPriority } from "./taskPriority";

export interface TaskFormValues {
  title: string;
  priority: TaskPriority;
  description: string;
}
