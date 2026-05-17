<script setup lang="ts">
interface Props {
  modelValue: string;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class="field">
    <label class="field__label"> Titre </label>

    <input
      :value="modelValue"
      type="text"
      class="field__input"
      placeholder="Ex: Préparer le dîner"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field__label {
  color: var(--color-text);

  font-size: 0.95rem;
  font-weight: 600;
}

.field__input {
  width: 100%;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-lg);

  background: var(--color-surface);

  padding: 14px 16px;

  color: var(--color-text);

  font-size: 1rem;

  box-shadow: var(--shadow-soft);

  transition: var(--transition);
}

.field__input:focus {
  outline: none;

  border-color: var(--color-primary-soft);
}
</style>
