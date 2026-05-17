import type { Task } from "../types/task";
import type { TaskFormValues } from "../types/taskForm";

export interface TaskService {
  getTasks(householdId: string): Promise<Task[]>;

  getTaskById(householdId: string, taskId: string): Promise<Task | null>;

  createTask(householdId: string, values: TaskFormValues): Promise<Task>;

  updateTask(
    householdId: string,
    taskId: string,
    values: Partial<TaskFormValues>,
  ): Promise<void>;

  completeTask(householdId: string, taskId: string): Promise<void>;

  subscribeToTasks(
    householdId: string,
    callback: (tasks: Task[]) => void,
  ): () => void;
}
