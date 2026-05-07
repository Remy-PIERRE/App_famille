import type { EventService } from "@/types/services/EventService";
import { mockEvents } from "./eventMock";

export const eventServiceMock: EventService = {
  async getAll() {
    return [...mockEvents];
  },

  async add(event) {
    mockEvents.push(event);
  },

  async remove(id) {
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index !== -1) mockEvents.splice(index, 1);
  },
};
