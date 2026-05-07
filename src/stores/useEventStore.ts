import { defineStore } from "pinia";
import type { Event } from "@/types/Event";
import { eventService } from "@/services";

export const useEventStore = defineStore("events", {
  state: () => ({
    events: [] as Event[],
    loading: false,
  }),

  getters: {
    eventsByDate: (state) => {
      return (date: string) => state.events.filter((e) => e.date === date);
    },
  },

  actions: {
    async fetch() {
      this.loading = true;
      this.events = await eventService.getAll();
      this.loading = false;
    },

    async add(event: Event) {
      await eventService.add(event);
      this.events.push(event);
    },

    async remove(id: string) {
      await eventService.remove(id);
      this.events = this.events.filter((e) => e.id !== id);
    },
  },
});
