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

  display: flex;
  flex-direction: column;

  background: radial-gradient(circle at top, #f7f5ef 0%, var(--color-bg) 60%);

  color: var(--color-text);
}

.content {
  flex: 1;

  width: 100%;
  max-width: 980px;

  margin: 0 auto;

  padding: var(--space-5) var(--space-4) 96px;
}
</style>
