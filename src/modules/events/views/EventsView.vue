<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { ChevronLeft, ChevronRight } from "lucide-vue-next";

import AppPageLayout from "@/ui/layout/AppPageLayout.vue";
import BaseSurface from "@/ui/components/base/BaseSurface.vue";
import BaseButton from "@/ui/components/base/BaseButton.vue";

import { useEventStore } from "@/stores/useEventStore";

const store = useEventStore();
const router = useRouter();

const currentDate = new Date();

const month = ref(currentDate.getMonth());
const year = ref(currentDate.getFullYear());

onMounted(() => {
  store.fetch();
});

/* =========================
   CALENDAR
========================= */

const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate();
});

const firstDayOffset = computed(() => {
  const firstDay = new Date(year.value, month.value, 1).getDay();

  // lundi = premier jour
  return firstDay === 0 ? 6 : firstDay - 1;
});

const calendarDays = computed(() => {
  return [
    ...Array(firstDayOffset.value).fill(null),
    ...Array.from({ length: daysInMonth.value }, (_, i) => i + 1),
  ];
});

const weekdays = ["L", "M", "M", "J", "V", "S", "D"];

/* =========================
   HELPERS
========================= */

function formatDate(day: number) {
  return `${year.value}-${String(month.value + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function goToDay(day: number) {
  router.push(`/events/${formatDate(day)}`);
}

function previousMonth() {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
    return;
  }

  month.value--;
}

function nextMonth() {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
    return;
  }

  month.value++;
}

const monthLabel = computed(() => {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date(year.value, month.value));
});

function isToday(day: number) {
  const today = new Date();

  return (
    today.getDate() === day &&
    today.getMonth() === month.value &&
    today.getFullYear() === year.value
  );
}
</script>

<template>
  <AppPageLayout title="Événements" subtitle="Planning familial du mois">
    <div class="calendar-page">
      <!-- MONTH NAVIGATION -->
      <div class="calendar-toolbar">
        <BaseButton variant="ghost" size="sm" @click="previousMonth">
          <ChevronLeft :size="18" />
        </BaseButton>

        <div class="month-title">
          {{ monthLabel }}
        </div>

        <BaseButton variant="ghost" size="sm" @click="nextMonth">
          <ChevronRight :size="18" />
        </BaseButton>
      </div>

      <!-- WEEKDAYS -->
      <div class="weekdays">
        <div v-for="day in weekdays" :key="day" class="weekday">
          {{ day }}
        </div>
      </div>

      <!-- CALENDAR -->
      <div class="calendar-grid">
        <template v-for="(day, index) in calendarDays" :key="index">
          <div v-if="day === null" class="empty-day" />

          <BaseSurface
            v-else
            interactive
            padding="sm"
            class="day-card"
            :class="{
              today: isToday(day),
            }"
            @click="goToDay(day)"
          >
            <div class="day-header">
              <span class="day-number">
                {{ day }}
              </span>
            </div>

            <div class="events">
              <div
                v-for="event in store.eventsByDate(formatDate(day))"
                :key="event.id"
                class="event-pill"
              >
                {{ event.title }}
              </div>
            </div>
          </BaseSurface>
        </template>
      </div>
    </div>
  </AppPageLayout>
</template>

<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

/* =========================
   TOOLBAR
========================= */

.calendar-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.month-title {
  font-size: 18px;
  font-weight: 700;

  color: var(--color-text);

  text-transform: capitalize;
}

/* =========================
   WEEKDAYS
========================= */

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  gap: var(--space-2);
}

.weekday {
  text-align: center;

  font-size: 12px;
  font-weight: 700;

  color: var(--color-muted);
}

/* =========================
   GRID
========================= */

.calendar-grid {
  display: grid;

  grid-template-columns: repeat(7, minmax(0, 1fr));

  gap: var(--space-2);

  width: 100%;
}

.empty-day {
  min-height: 96px;
}

/* =========================
   DAY CARD
========================= */

.day-card {
  min-height: 96px;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  cursor: pointer;
}

.day-header {
  display: flex;
  justify-content: space-between;
}

.day-number {
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;

  font-size: 13px;
  font-weight: 700;

  color: var(--color-text);
}

/* TODAY */
.day-card.today .day-number {
  background: var(--color-primary);
  color: white;
}

/* =========================
   EVENTS
========================= */

.events {
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;

  overflow: hidden;
}

.event-pill {
  min-width: 0;

  padding: 4px 8px;

  border-radius: 999px;

  background: rgba(53, 92, 77, 0.1);

  color: var(--color-primary);

  font-size: 11px;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 640px) {
  .calendar-grid {
    gap: 6px;
  }

  .day-card {
    min-height: 82px;
    padding: 8px !important;
  }

  .event-pill {
    font-size: 10px;
    padding: 3px 6px;
  }

  .month-title {
    font-size: 16px;
  }
}
</style>
