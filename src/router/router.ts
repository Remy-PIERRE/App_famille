import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "@/layouts/appLayout/AppLayout.vue";

// Views
import HomeView from "@/views/HomeView.vue";

// Modules
import TasksView from "@/modules/tasks/views/TasksView.vue";
import ShoppingView from "@/modules/shopping/views/ShoppingView.vue";
import RecipesView from "@/modules/recipes/views/RecipesView.vue";
import EventsView from "@/modules/events/views/EventsView.vue";

import EventDetailView from "@/modules/events/views/EventDetailView.vue";
import RecipeDetailView from "@/modules/recipes/views/RecipeDetailView.vue";
import { useAuthStore } from "@/stores/useAuthStore";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: AppLayout,
      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: {
            title: "Accueil",
            nav: true,
            icon: "Home",
          },
        },

        {
          path: "tasks",
          name: "tasks",
          component: TasksView,
          meta: {
            title: "Tâches",
            nav: true,
            icon: "CheckSquare",
          },
        },

        {
          path: "shopping",
          name: "shopping",
          component: ShoppingView,
          meta: {
            title: "Courses",
            nav: true,
            icon: "ShoppingCart",
          },
        },

        {
          path: "recipes",
          name: "recipes",
          component: RecipesView,
          meta: {
            title: "Recettes",
            nav: true,
            icon: "Utensils",
          },
        },

        {
          path: "events",
          name: "events",
          component: EventsView,
          meta: {
            title: "Événements",
            nav: true,
            icon: "Calendar",
          },
        },

        {
          path: "events/:date",
          name: "event-detail",
          component: EventDetailView,
          meta: {
            title: "Détail événement",
            nav: false,
          },
        },

        {
          path: "recipes/:id",
          name: "recipe-detail",
          component: RecipeDetailView,
          meta: {
            title: "Recette",
            nav: false,
          },
        },
      ],
    },
  ],
});

export default router;

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
