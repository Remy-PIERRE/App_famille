export interface Event {
  id: string;
  title: string;
  description?: string;

  startTime?: string;
  endTime?: string;
  comment?: string;

  date: string; // ISO (YYYY-MM-DD)

  userId?: string; // futur multi-user
}

export type CreateEventInput = Omit<Event, "id">;
