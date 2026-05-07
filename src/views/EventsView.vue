<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEventStore } from "@/stores/useEventStore";
import BaseCard from "@/components/ui/BaseCard.vue";
import { useRouter } from "vue-router";

const store = useEventStore();
const router = useRouter();

const currentDate = new Date();

const month = ref(currentDate.getMonth());
const year = ref(currentDate.getFullYear());

onMounted(() => {
  store.fetch();
});

// 🧠 générer jours du mois
const daysInMonth = computed(() => {
  const date = new Date(year.value, month.value + 1, 0);
  return date.getDate();
});

function formatDate(day: number) {
  return `${year.value}-${String(month.value + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function goToDay(day: number) {
  const date = formatDate(day);
  router.push(`/events/${date}`);
}

const monthInput = computed({
  get() {
    return `${year.value}-${String(month.value + 1).padStart(2, "0")}`;
  },
  set(value: string) {
    const [y, m] = value.split("-").map(Number);
    year.value = y;
    month.value = m - 1;
  },
});
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Événements</h1>

      <div class="filters">
        <input type="month" v-model="monthInput" />
      </div>
    </div>

    <div class="calendar">
      <BaseCard
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        @click="goToDay(day)"
      >
        <div class="date">{{ day }}</div>

        <div class="events">
          <div
            v-for="event in store.eventsByDate(formatDate(day))"
            :key="event.id"
            class="event"
          >
            {{ event.title }}
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day {
  min-height: 80px;
  cursor: pointer;
}

.date {
  font-weight: bold;
}

.event {
  font-size: 12px;
  color: var(--color-primary);
}
</style>
