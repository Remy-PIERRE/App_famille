<script setup lang="ts">
import { ref, watch } from "vue";
import { useProducts } from "@/composables/useProducts";
import type { Ingredient } from "@/types/Ingredient";
import { useProductStore } from "@/stores/useProductStore";

const props = defineProps<{
  modelValue: Ingredient;
}>();

const emit = defineEmits(["update:modelValue", "remove"]);

const { products } = useProducts();
const productStore = useProductStore();

const name = ref(props.modelValue.name);
const quantity = ref(props.modelValue.quantity);
const unit = ref(props.modelValue.unit);

const suggestions = ref<typeof products.value>([]);

// 🔍 recherche simple
watch(name, (value) => {
  if (!value) {
    suggestions.value = [];
    return;
  }

  suggestions.value = productStore.search(value);
});

// 🔗 sélection produit existant
function selectProduct(product: any) {
  name.value = product.name;

  update({
    productId: product.id,
    name: product.name,
    unit: product.defaultUnit,
  });

  suggestions.value = [];
}

// ➕ création rapide
async function createProduct() {
  const product = await productStore.addProduct(name.value);

  update({
    productId: product.id,
    name: product.name,
    unit: product.defaultUnit,
  });

  suggestions.value = [];
}

// 🔄 sync vers parent
function update(partial: Partial<Ingredient> = {}) {
  emit("update:modelValue", {
    ...props.modelValue,
    name: name.value,
    quantity: quantity.value,
    unit: unit.value,
    ...partial,
  });
}

watch([name, quantity, unit], () => update());
</script>

<template>
  <div class="ingredient">
    <!-- nom -->
    <div class="field">
      <input v-model="name" placeholder="Ingrédient (ex: jambon)" />

      <!-- suggestions -->
      <div v-if="suggestions.length" class="suggestions">
        <div
          v-for="product in suggestions"
          :key="product.id"
          @click="selectProduct(product)"
        >
          {{ product.name }}
        </div>

        <div class="create" @click="createProduct">+ Créer "{{ name }}"</div>
      </div>
    </div>

    <!-- quantité -->
    <input type="number" v-model.number="quantity" placeholder="Qté" />

    <!-- unité -->
    <input v-model="unit" placeholder="unité" />

    <!-- delete -->
    <button class="remove" @click="$emit('remove')">✕</button>
  </div>
</template>

<style scoped>
.ingredient {
  display: grid;
  grid-template-columns: 1fr 80px 80px 32px;
  gap: 8px;
  align-items: center;
}

.field {
  position: relative;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: var(--radius);
  border: 1px solid var(--color-gray);
}

input:focus {
  outline: none;
  border-color: var(--color-secondary);
}

/* suggestions */
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  background: white;
  border: 1px solid var(--color-gray);
  border-radius: var(--radius);

  z-index: 10;
}

.suggestions > div {
  padding: 8px;
  cursor: pointer;
}

.suggestions > div:hover {
  background: var(--color-gray-light);
}

.create {
  font-weight: 600;
  color: var(--color-primary);
}

/* delete */
.remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gray-dark);
}
</style>
