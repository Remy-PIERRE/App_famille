import type { Event, CreateEventInput } from "@/types/Event";

export interface EventService {
  getAll(): Promise<Event[]>;
  add(event: CreateEventInput): Promise<Event>;
  remove(id: string): Promise<void>;
}
