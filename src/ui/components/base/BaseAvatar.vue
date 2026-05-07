<script setup lang="ts">
import { computed } from "vue";

interface Props {
  src?: string;
  alt?: string;
  name?: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
});

const initials = computed(() => {
  if (!props.name) return "?";
  return props.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
});
</script>

<template>
  <div class="avatar" :style="{ width: size + 'px', height: size + 'px' }">
    <img v-if="src" :src="src" :alt="alt || name" />

    <span v-else>
      {{ initials }}
    </span>
  </div>
</template>

<style scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;

  background: linear-gradient(135deg, #355c4d, #4b7a63);

  color: #f8f7f3;

  font-weight: 700;
  font-size: 0.85rem;

  overflow: hidden;

  box-shadow: 0 6px 16px rgba(53, 92, 77, 0.18);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
