import type { Timestamp } from "firebase/firestore";
import type { TaskPriority } from "./taskPriority";
import type { TaskStatus } from "./taskStatus";

export interface Task {
  id: string;

  templateId?: string;
  recurrenceKey?: string;

  title: string;
  description?: string;

  assigneeId?: string;

  priority: TaskPriority;

  status: TaskStatus;

  dueDate?: Timestamp;

  completedAt?: Timestamp;
  completedBy?: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
