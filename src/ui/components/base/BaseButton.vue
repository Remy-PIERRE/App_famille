<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "soft";

type ButtonSize = "sm" | "md" | "lg";

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  block: false,
  rounded: false,
});

const classes = computed(() => [
  "base-button",
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    "is-block": props.block,
    "is-loading": props.loading,
    "is-rounded": props.rounded,
  },
]);
</script>

<template>
  <button :class="classes" :disabled="disabled || loading">
    <span v-if="loading" class="base-button__spinner" />

    <span class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  min-height: 50px;
  padding: 0 1.4rem;

  border: 1px solid transparent;
  border-radius: 16px;

  font-size: 0.95rem;
  font-weight: 600;

  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    transform 120ms ease,
    box-shadow 180ms ease;

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;
}

.base-button:hover {
  transform: translateY(-1px);
}

.base-button:active {
  transform: scale(0.985);
}

.base-button--primary {
  background: #355c4d;
  color: #f8f7f3;

  box-shadow: 0 8px 18px rgba(53, 92, 77, 0.18);
}

.base-button--secondary {
  background: #ebe6dd;
  color: #355c4d;

  border-color: #ddd6ca;
}

.base-button--ghost {
  background: transparent;
  color: #355c4d;
}

.base-button--ghost:hover {
  background: rgba(53, 92, 77, 0.07);
}

.base-button--danger {
  background: #b4534b;
  color: white;
}

.base-button--soft {
  background: #f4f1eb;
  color: #4b5563;
}

.base-button--sm {
  min-height: 40px;
}

.base-button--md {
  min-height: 50px;
}

.base-button--lg {
  min-height: 58px;
  font-size: 1rem;
}

.is-block {
  width: 100%;
}

.is-rounded {
  border-radius: 999px;
}
</style>
