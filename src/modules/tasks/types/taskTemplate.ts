import type { Timestamp } from "firebase/firestore";
import type { TaskPriority } from "./taskPriority";
import type { RecurrenceRule } from "./recurrenceRule";

export interface TaskTemplate {
  id: string;

  title: string;
  description?: string;

  defaultAssigneeId?: string;

  priority: TaskPriority;

  recurrence: RecurrenceRule;

  isArchived: boolean;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
