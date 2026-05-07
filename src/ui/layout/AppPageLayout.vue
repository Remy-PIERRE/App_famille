<script setup lang="ts">
import BaseSurface from "@/ui/components/base/BaseSurface.vue";

interface Props {
  title?: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="page">
    <header v-if="title" class="header">
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </header>

    <BaseSurface class="content">
      <slot />
    </BaseSurface>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.header p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
}

.content {
  padding: 16px;

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(53, 92, 77, 0.1);

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
}
</style>
