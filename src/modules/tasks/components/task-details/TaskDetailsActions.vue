<script setup lang="ts">
import BaseButton from "@/ui/components/base/BaseButton.vue";

defineEmits<{
  complete: [];
  edit: [];
}>();
</script>

<template>
  <div class="task-actions">
    <BaseButton full-width @click="$emit('complete')"> Terminer </BaseButton>

    <BaseButton variant="secondary" full-width @click="$emit('edit')">
      Modifier
    </BaseButton>
  </div>
</template>

<style scoped>
.task-actions {
  position: sticky;

  bottom: 0;

  display: flex;
  gap: var(--space-3);

  padding-top: var(--space-4);

  background: linear-gradient(
    to top,
    var(--color-bg),
    rgba(246, 244, 239, 0.7)
  );

  backdrop-filter: var(--blur-md);
}
</style>
