import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/useAuthStore";

/* LAYOUT */
import AppLayout from "@/layouts/appLayout/AppLayout.vue";

/* AUTH */
import LoginView from "@/views/LoginView.vue";

/* ONBOARDING */
import HouseholdChoiceView from "@/modules/household/views/HouseholdChoiceView.vue";
import CreateHouseholdView from "@/modules/household/views/CreateHouseholdView.vue";
import JoinHouseholdView from "@/modules/household/views/JoinHouseholdView.vue";

/* APP */
import HomeView from "@/views/HomeView.vue";
import TasksView from "@/modules/tasks/views/TasksView.vue";
import ShoppingView from "@/modules/shopping/views/ShoppingView.vue";
import RecipesView from "@/modules/recipes/views/RecipesView.vue";
import RecipeDetailView from "@/modules/recipes/views/RecipeDetailView.vue";
import EventsView from "@/modules/events/views/EventsView.vue";
import EventDetailView from "@/modules/events/views/EventDetailView.vue";
import { useHouseholdStore } from "@/stores/useHouseholdStore";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    /* =========================
       AUTH
    ========================= */
    {
      path: "/login",
      component: LoginView,
      meta: {
        guestOnly: true,
      },
    },

    /* =========================
       ONBOARDING
    ========================= */
    {
      path: "/onboarding",
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: HouseholdChoiceView,
        },
        {
          path: "create",
          component: CreateHouseholdView,
        },
        {
          path: "join",
          component: JoinHouseholdView,
        },
      ],
    },

    /* =========================
       APP
    ========================= */
    {
      path: "/",
      component: AppLayout,

      meta: {
        requiresAuth: true,
        requiresHousehold: true,
      },

      children: [
        {
          path: "",

          component: HomeView,
        },

        {
          path: "tasks",

          component: TasksView,
        },

        {
          path: "shopping",

          component: ShoppingView,
        },

        {
          path: "recipes",

          component: RecipesView,
        },

        {
          path: "recipes/:id",

          component: RecipeDetailView,
        },

        {
          path: "events",

          component: EventsView,
        },

        {
          path: "events/:date",

          component: EventDetailView,
        },
      ],
    },
  ],
});

/* =========================
   GUARDS
========================= */

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const householdStore = useHouseholdStore();

  const isAuthenticated = authStore.isAuthenticated;
  const needsOnboarding = authStore.needsOnboarding;
  const hasHousehold = !!householdStore.currentHousehold;

  /* =========================
     GUEST ONLY
  ========================= */

  if (to.meta.guestOnly && isAuthenticated) {
    return needsOnboarding ? "/onboarding" : "/";
  }

  /* =========================
     AUTH REQUIRED
  ========================= */

  if (to.meta.requiresAuth && !isAuthenticated) {
    return "/login";
  }

  /* =========================
     ONBOARDING
  ========================= */

  if (isAuthenticated && !hasHousehold && !to.path.startsWith("/onboarding")) {
    return "/onboarding";
  }

  /* =========================
     BLOCK ONBOARDING
  ========================= */

  if (hasHousehold && to.path.startsWith("/onboarding")) {
    return "/";
  }
});

export default router;
