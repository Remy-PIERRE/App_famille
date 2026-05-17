<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button class="fab" type="button" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<style scoped>
.fab {
  position: fixed;

  right: 20px;

  bottom: var(--fab-offset-bottom);

  z-index: 30;

  width: 58px;
  height: 58px;

  border: none;

  border-radius: 999px;

  background: var(--color-primary);

  color: white;

  font-size: 1.8rem;
  font-weight: 500;

  box-shadow: var(--shadow-floating);

  transition: var(--transition);
}

.fab:active {
  transform: scale(0.96);
}
</style>
