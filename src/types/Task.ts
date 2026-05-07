export type TaskStatus = "todo" | "in_progress" | "done" | "cancelled";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;

  userId?: string; // futur
}
