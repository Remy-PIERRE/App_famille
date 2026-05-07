<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useEventStore } from "@/stores/useEventStore";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const route = useRoute();
const store = useEventStore();

const date = route.params.date as string;

const events = computed(() => store.eventsByDate(date));

const newTitle = ref("");

function addEvent() {
  if (!newTitle.value) return;

  store.add({
    id: crypto.randomUUID(),
    title: newTitle.value,
    date,
  });

  newTitle.value = "";
}
</script>

<template>
  <div class="page">
    <h1>{{ date }}</h1>

    <BaseCard>
      <input v-model="newTitle" placeholder="Nouvel événement" />
      <BaseButton label="Ajouter" @click="addEvent" />
    </BaseCard>

    <BaseCard v-for="event in events" :key="event.id">
      <div class="item">
        {{ event.title }}

        <BaseButton
          variant="ghost"
          label="Supprimer"
          @click="store.remove(event.id)"
        />
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item {
  display: flex;
  justify-content: space-between;
}
</style>
