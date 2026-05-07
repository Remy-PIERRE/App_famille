import type { Task } from "@/types/Task";

export interface TaskService {
  getAll(): Promise<Task[]>;
  add(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  remove(id: string): Promise<void>;
}
