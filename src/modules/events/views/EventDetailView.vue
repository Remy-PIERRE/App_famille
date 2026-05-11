<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { ArrowLeft, Calendar, Plus, Trash2 } from "lucide-vue-next";

import AppPageLayout from "@/ui/layout/AppPageLayout.vue";

import BaseButton from "@/ui/components/base/BaseButton.vue";
import BaseSurface from "@/ui/components/base/BaseSurface.vue";
import BaseExpendableCard from "@/ui/components/data-display/BaseExpendableCard.vue";

import { useEventStore } from "@/stores/useEventStore";

const route = useRoute();
const router = useRouter();

const store = useEventStore();

const date = route.params.date as string;

const events = computed(() => {
  return store.eventsByDate(date);
});

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
});

const newTitle = ref("");
const startTime = ref("");
const endTime = ref("");
const comment = ref("");

function addEvent() {
  const title = newTitle.value.trim();

  if (!title) return;

  store.add({
    title,
    date,
    startTime: startTime.value || undefined,
    endTime: endTime.value || undefined,
    comment: comment.value.trim() || undefined,
  });

  newTitle.value = "";
  startTime.value = "";
  endTime.value = "";
  comment.value = "";
}

function removeEvent(id: string) {
  store.remove(id);
}
</script>

<template>
  <AppPageLayout>
    <div class="event-detail-page">
      <!-- HEADER -->
      <div class="page-header">
        <BaseButton variant="ghost" size="sm" @click="router.back()">
          <ArrowLeft :size="18" />
        </BaseButton>

        <div class="header-content">
          <div class="icon-wrapper">
            <Calendar :size="18" />
          </div>

          <div>
            <h1>
              {{ formattedDate }}
            </h1>

            <p>
              {{ events.length }}
              événement(s)
            </p>
          </div>
        </div>
      </div>

      <!-- ADD EVENT -->
      <BaseSurface padding="lg" radius="lg" class="create-card">
        <div class="create-form">
          <!-- TITLE -->
          <div class="field">
            <label> Événement </label>

            <input
              v-model="newTitle"
              type="text"
              placeholder="Ajouter un événement..."
              @keyup.enter="addEvent"
            />
          </div>

          <!-- TIME -->
          <div class="time-grid">
            <div class="field">
              <label> Début </label>

              <input v-model="startTime" type="time" />
            </div>

            <div class="field">
              <label> Fin </label>

              <input v-model="endTime" type="time" />
            </div>
          </div>

          <!-- COMMENT -->
          <div class="field">
            <label> Commentaire </label>

            <textarea
              v-model="comment"
              rows="3"
              placeholder="Ajouter une note..."
            />
          </div>

          <!-- ACTION -->
          <BaseButton variant="primary" full-width @click="addEvent">
            <Plus :size="16" />

            Ajouter
          </BaseButton>
        </div>
      </BaseSurface>

      <!-- EVENTS -->
      <div v-if="events.length" class="events-list">
        <BaseExpendableCard
          v-if="events.length"
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :subtitle="
            event.endTime
              ? `${event.startTime} - ${event.endTime}`
              : event.startTime
          "
        >
          <div class="details">
            <p v-if="event.comment">
              {{ event.comment }}
            </p>

            <BaseButton
              variant="ghost"
              size="sm"
              @click="removeEvent(event.id)"
            >
              <Trash2 :size="16" />
              Supprimer
            </BaseButton>
          </div>
        </BaseExpendableCard>
      </div>

      <!-- EMPTY STATE -->
      <BaseSurface v-else padding="lg" class="empty-state">
        <div class="empty-icon">📆</div>

        <h2>Aucun événement</h2>

        <p>Ajoutez un événement pour organiser cette journée.</p>
      </BaseSurface>
    </div>
  </AppPageLayout>
</template>

<style scoped>
.event-detail-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);

  min-width: 0;
}

/* =========================
   HEADER
========================= */

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.icon-wrapper {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background: rgba(53, 92, 77, 0.1);

  color: var(--color-primary);

  flex-shrink: 0;
}

.header-content h1 {
  font-size: 22px;
  font-weight: 800;

  color: var(--color-text);

  text-transform: capitalize;
}

.header-content p {
  margin-top: 2px;

  font-size: 13px;

  color: var(--color-muted);
}

/* =========================
   CREATE
========================= */

.create-card {
  backdrop-filter: blur(14px);
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  min-width: 0;
}

/* =========================
   FIELDS
========================= */

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  min-width: 0;
}

.field label {
  font-size: 13px;
  font-weight: 700;

  color: var(--color-text);
}

/* =========================
   INPUTS
========================= */

.field input,
.field textarea {
  width: 100%;

  min-width: 0;

  padding: 14px 16px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  background: rgba(255, 255, 255, 0.72);

  color: var(--color-text);

  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.field textarea {
  resize: vertical;
  min-height: 92px;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #9ca3af;
}

/* =========================
   FOCUS
========================= */

.field input:focus,
.field textarea:focus {
  outline: none;

  border-color: var(--color-primary);

  background: white;

  box-shadow: 0 0 0 4px rgba(53, 92, 77, 0.12);
}

/* =========================
   TIME GRID
========================= */

.time-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: var(--space-3);

  min-width: 0;
}

/* =========================
   EVENTS
========================= */

.events-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.event-card {
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.event-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);

  min-width: 0;
}

.event-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  min-width: 0;
}

.event-dot {
  width: 10px;
  height: 10px;

  border-radius: 999px;

  background: var(--color-primary);

  flex-shrink: 0;
}

.event-title {
  font-size: 15px;
  font-weight: 600;

  color: var(--color-text);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =========================
   EMPTY STATE
========================= */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  gap: var(--space-3);

  padding: 36px 20px;
}

.empty-icon {
  font-size: 42px;
}

.empty-state h2 {
  font-size: 18px;
  font-weight: 700;

  color: var(--color-text);
}

.empty-state p {
  max-width: 260px;

  font-size: 14px;
  line-height: 1.6;

  color: var(--color-muted);
}

/* =========================
   MOBILE
========================= */

@media (max-width: 640px) {
  .create-form {
    flex-direction: column;
  }

  .header-content h1 {
    font-size: 20px;
  }
}
</style>
