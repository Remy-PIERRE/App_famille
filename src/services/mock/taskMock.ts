import type { Task } from "@/types/Task";

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Faire les courses",
    status: "todo",
    priority: "high",
  },
  {
    id: "t2",
    title: "Nettoyer la cuisine",
    status: "in_progress",
    priority: "medium",
  },
  {
    id: "t3",
    title: "Appeler le médecin",
    status: "done",
    priority: "high",
  },
];
