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
      :class="{ active: route.path.startsWith(item.path) }"
      @click="router.push(item.path)"
    >
      <component :is="item.icon" :size="20" />

      <span>{{ item.name }}</span>
    </button>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-around;

  background: white;
  border-top: 1px solid var(--color-gray);

  padding: 6px 0;
}

button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  background: none;
  border: none;

  font-size: 11px;
  color: var(--color-gray-dark);

  cursor: pointer;
  transition: var(--transition);
}

button svg {
  stroke-width: 2;
}

button.active {
  color: var(--color-primary);
}

button.active svg {
  transform: scale(1.1);
}
</style>
