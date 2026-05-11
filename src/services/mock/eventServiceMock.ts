import type { EventService } from "@/types/services/EventService";
import { mockEvents } from "./eventMock";
import type { Event, CreateEventInput } from "@/types/Event";

export const eventServiceMock: EventService = {
  async getAll() {
    return [...mockEvents];
  },

  async add(event: CreateEventInput) {
    mockEvents.push(event as Event);
    return event as Event;
  },

  async remove(id) {
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index !== -1) mockEvents.splice(index, 1);
  },
};
