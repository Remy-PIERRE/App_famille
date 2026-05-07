import type { Event } from "@/types/Event";

export interface EventService {
  getAll(): Promise<Event[]>;
  add(event: Event): Promise<void>;
  remove(id: string): Promise<void>;
}
