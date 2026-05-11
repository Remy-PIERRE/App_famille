<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronDown } from "lucide-vue-next";

interface Props {
  title?: string;
  subtitle?: string;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
});

const isOpen = ref(props.defaultOpen);

function toggle() {
  isOpen.value = !isOpen.value;
}

const classes = computed(() => ({
  open: isOpen.value,
}));
</script>

<template>
  <div class="expandable-card" :class="classes">
    <!-- HEADER -->
    <button class="header" type="button" @click="toggle">
      <div class="content">
        <div class="text">
          <h3 v-if="title">
            {{ title }}
          </h3>

          <p v-if="subtitle">
            {{ subtitle }}
          </p>

          <slot v-if="!title" name="header" />
        </div>

        <div class="icon">
          <ChevronDown :size="18" />
        </div>
      </div>
    </button>

    <!-- BODY -->
    <transition name="expand">
      <div v-if="isOpen" class="body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.expandable-card {
  border-radius: var(--radius-lg);

  background: var(--color-surface);

  border: 1px solid var(--color-border);

  overflow: hidden;

  box-shadow: var(--shadow-sm);

  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.expandable-card.open {
  border-color: rgba(53, 92, 77, 0.18);

  box-shadow: var(--shadow-md);
}

/* =========================
   HEADER
========================= */

.header {
  width: 100%;

  border: none;
  background: transparent;

  padding: 16px;

  cursor: pointer;

  text-align: left;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.text {
  min-width: 0;
}

.text h3 {
  font-size: 15px;
  font-weight: 700;

  color: var(--color-text);
}

.text p {
  margin-top: 2px;

  font-size: 13px;

  color: var(--color-muted);
}

/* =========================
   ICON
========================= */

.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-muted);

  transition:
    transform 180ms ease,
    color 180ms ease;

  flex-shrink: 0;
}

.expandable-card.open .icon {
  transform: rotate(180deg);

  color: var(--color-primary);
}

/* =========================
   BODY
========================= */

.body {
  padding: 0 16px 16px;

  border-top: 1px solid rgba(53, 92, 77, 0.08);
}

/* =========================
   ANIMATION
========================= */

.expand-enter-active,
.expand-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
