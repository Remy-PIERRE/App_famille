<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppBottomNav from "./AppBottomNav.vue";
</script>

<template>
  <div class="layout">
    <AppHeader />

    <main class="content">
      <router-view />
    </main>

    <AppBottomNav />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 16px;
  padding-bottom: 80px; /* espace pour la bottom nav */
}
</style>
