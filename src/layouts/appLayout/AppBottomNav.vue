<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

import {
  Home,
  CheckSquare,
  ShoppingCart,
  Utensils,
  Calendar,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const items = [
  { name: "Accueil", path: "/", icon: Home },
  { name: "Tâches", path: "/tasks", icon: CheckSquare },
  { name: "Courses", path: "/shopping", icon: ShoppingCart },
  { name: "Recettes", path: "/recipes", icon: Utensils },
  { name: "Événements", path: "/events", icon: Calendar },
];
</script>

<template>
  <nav class="bottom-nav">
    <button
      v-for="item in items"
      :key="item.path"
      class="nav-item"
      :class="{ active: route.path.startsWith(item.path) }"
      @click="router.push(item.path)"
    >
      <component :is="item.icon" :size="20" class="icon" />

      <span class="label">
        {{ item.name }}
      </span>
    </button>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;

  bottom: var(--space-3);
  left: var(--space-3);
  right: var(--space-3);

  display: flex;
  justify-content: space-between;

  padding: var(--space-2);

  background: var(--color-surface);
  backdrop-filter: var(--blur-lg);

  border: 1px solid var(--color-border);

  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-floating);
}

.nav-item {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: var(--space-1);

  padding: var(--space-2);

  border: none;
  background: transparent;

  border-radius: var(--radius-md);

  color: var(--color-muted);

  cursor: pointer;

  transition: var(--transition);

  min-height: 54px;
}

.nav-item:active {
  transform: scale(0.96);
}

.icon {
  transition: transform 160ms ease;
}

.label {
  font-size: 11px;
  font-weight: 600;
}

/* ACTIVE STATE */
.nav-item.active {
  background: var(--color-active-bg);
  color: var(--color-primary);
}

.nav-item.active .icon {
  transform: translateY(-1px);
}

/* hover desktop */
@media (hover: hover) {
  .nav-item:hover {
    background: rgba(53, 92, 77, 0.06);
  }
}
</style>
