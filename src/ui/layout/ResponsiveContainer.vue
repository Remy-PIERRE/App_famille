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
