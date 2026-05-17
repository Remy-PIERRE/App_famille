import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import type { Task } from "../types/task";
import type { TaskService } from "./taskService";
import { db } from "@/config/firebase";
import { mapTaskDocument } from "../mappers/task";
import type { TaskFormValues } from "../types/taskForm";

export class FirestoreTaskService implements TaskService {
  private getTasksCollection(householdId: string) {
    return collection(db, "households", householdId, "tasks");
  }

  async getTasks(householdId: string): Promise<Task[]> {
    const tasksRef = this.getTasksCollection(householdId);

    const q = query(tasksRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(mapTaskDocument);
  }

  async getTaskById(householdId: string, taskId: string): Promise<Task | null> {
    const taskRef = doc(db, "households", householdId, "tasks", taskId);

    const snapshot = await getDoc(taskRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Task;
  }

  async createTask(householdId: string, values: TaskFormValues): Promise<Task> {
    const tasksRef = this.getTasksCollection(householdId);

    const payload = {
      title: values.title,

      description: values.description,

      priority: values.priority,

      status: "todo",

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(tasksRef, payload);

    return {
      id: docRef.id,
      ...payload,
    } as Task;
  }

  async updateTask(
    householdId: string,
    taskId: string,
    values: Partial<TaskFormValues>,
  ): Promise<void> {
    const taskRef = doc(db, "households", householdId, "tasks", taskId);

    await updateDoc(taskRef, {
      ...values,

      updatedAt: serverTimestamp(),
    });
  }

  async completeTask(householdId: string, taskId: string): Promise<void> {
    const taskRef = doc(db, "households", householdId, "tasks", taskId);

    await updateDoc(taskRef, {
      status: "done",

      completedAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    });
  }

  subscribeToTasks(householdId: string, callback: (tasks: Task[]) => void) {
    const tasksRef = this.getTasksCollection(householdId);

    const q = query(tasksRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(mapTaskDocument);

      callback(tasks);
    });
  }
}
