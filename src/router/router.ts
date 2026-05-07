import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/components/layout/AppLayout.vue";

import HomeView from "@/views/HomeView.vue";
import TasksView from "@/views/TasksView.vue";
import ShoppingView from "@/views/ShoppingView.vue";
import RecipesView from "@/views/RecipesView.vue";
import EventsView from "@/views/EventsView.vue";
import RecipeDetailView from "@/views/RecipeDetailView.vue";
import EventDetailView from "@/views/EventDetailView.vue";
import LoginView from "@/views/LoginView.vue";

import { useAuthStore } from "@/stores/useAuthStore";

const routes = [
  {
    path: "/login",
    component: LoginView,
    meta: { public: true },
  },

  {
    path: "/",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: HomeView },
      { path: "tasks", component: TasksView },
      { path: "shopping", component: ShoppingView },
      { path: "recipes", component: RecipesView },
      { path: "events", component: EventsView },
      { path: "events/:date", component: EventDetailView },
      { path: "recipes/:id", component: RecipeDetailView },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (auth.loading) {
    await auth.init();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return "/login";
  }

  if (to.path === "/login" && auth.isAuthenticated) {
    return "/";
  }
});
