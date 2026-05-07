<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="input-wrapper">
    <span v-if="label">{{ label }}</span>

    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </label>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
}

input {
  padding: 10px;
  border-radius: var(--radius);
  border: 1px solid var(--color-gray);
  transition: var(--transition);
}

input:focus {
  outline: none;
  border-color: var(--color-secondary);
}
</style>
