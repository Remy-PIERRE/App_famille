import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import type { Task } from "../types/task";

export function mapTaskDocument(
  doc: QueryDocumentSnapshot<DocumentData>,
): Task {
  const data = doc.data();

  return {
    id: doc.id,

    title: data.title,

    description: data.description ?? "",

    priority: data.priority,

    status: data.status,

    assigneeId: data.assigneeId ?? null,

    templateId: data.templateId ?? null,

    recurrenceKey: data.recurrenceKey ?? null,

    dueDate: data.dueDate ?? null,

    completedAt: data.completedAt ?? null,

    completedBy: data.completedBy ?? null,

    createdAt: data.createdAt,

    updatedAt: data.updatedAt,
  };
}
