export interface Event {
  id: string;
  title: string;
  description?: string;

  date: string; // ISO (YYYY-MM-DD)

  userId?: string; // futur multi-user
}
