<script setup lang="ts">
import { ref } from "vue";
import IngredientInput from "./IngredientInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import type { Recipe } from "@/types/Recipe";
import type { Ingredient } from "@/types/Ingredient";

const props = defineProps<{
  modelValue?: Recipe;
}>();

const emit = defineEmits(["save", "cancel"]);

// 🧠 state local
const name = ref(props.modelValue?.name || "");

const ingredients = ref<Ingredient[]>(
  props.modelValue?.ingredients || [createEmptyIngredient()],
);

// 🧩 helpers
function createEmptyIngredient(): Ingredient {
  return {
    id: crypto.randomUUID(),
    name: "",
    quantity: 1,
    unit: "",
  };
}

function addIngredient() {
  ingredients.value.push(createEmptyIngredient());
}

function removeIngredient(index: number) {
  ingredients.value.splice(index, 1);
}

// 💾 save
function save() {
  if (!name.value.trim()) return;

  const recipe: Recipe = {
    id: props.modelValue?.id || crypto.randomUUID(),
    name: name.value,
    ingredients: ingredients.value.filter((i) => i.name),
  };

  emit("save", recipe);
}
</script>

<template>
  <BaseCard>
    <div class="editor">
      <!-- titre -->
      <BaseInput v-model="name" placeholder="Nom de la recette" />

      <!-- ingrédients -->
      <div class="ingredients">
        <h3>Ingrédients</h3>

        <IngredientInput
          v-for="(ingredient, index) in ingredients"
          :key="ingredient.id"
          v-model="ingredients[index]"
          @remove="removeIngredient(index)"
        />

        <BaseButton
          variant="ghost"
          label="+ Ajouter un ingrédient"
          @click="addIngredient"
        />
      </div>

      <!-- actions -->
      <div class="actions">
        <BaseButton
          variant="secondary"
          label="Annuler"
          @click="$emit('cancel')"
        />

        <BaseButton label="Enregistrer" :disabled="!name" @click="save" />
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ingredients {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
