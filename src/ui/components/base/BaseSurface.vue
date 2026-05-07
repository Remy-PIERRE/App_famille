<script setup lang="ts">
import { computed } from "vue";

interface Props {
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
  elevation?: "none" | "sm" | "md";
  interactive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  padding: "md",
  radius: "md",
  elevation: "sm",
  interactive: false,
});

const classes = computed(() => [
  "surface",
  `surface--padding-${props.padding}`,
  `surface--radius-${props.radius}`,
  `surface--elevation-${props.elevation}`,
  {
    "is-interactive": props.interactive,
  },
]);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
