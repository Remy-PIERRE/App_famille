<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import BaseButton from "@/ui/components/base/BaseButton.vue";
import BaseSurface from "@/ui/components/base/BaseSurface.vue";

import { useAuthStore } from "@/stores/useAuthStore";

import { householdServiceFirebase } from "../services";

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const isLoading = ref(false);
const error = ref("");

async function createHousehold() {
  if (!authStore.user) {
    return;
  }

  if (!name.value.trim()) {
    error.value = "Veuillez saisir un nom";
    return;
  }

  try {
    isLoading.value = true;

    await householdServiceFirebase.create(authStore.user.id, {
      name: name.value,
    });

    authStore.user.householdId = "updated";

    router.push("/");
  } catch (e) {
    console.log("error : ", e);
    error.value = "Impossible de créer le foyer";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="hero">
        <h1>Créer un foyer</h1>

        <p>Donnez un nom à votre espace familial.</p>
      </div>

      <BaseSurface padding="lg" radius="lg">
        <div class="form">
          <div class="field">
            <label> Nom du foyer </label>

            <input v-model="name" type="text" placeholder="Famille Martin" />
          </div>

          <p v-if="error" class="error">
            {{ error }}
          </p>

          <BaseButton
            full-width
            size="lg"
            :disabled="isLoading"
            @click="createHousehold"
          >
            {{ isLoading ? "Création..." : "Créer le foyer" }}
          </BaseButton>
        </div>
      </BaseSurface>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--space-6);
}

.container {
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.hero {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field input {
  padding: 14px 16px;

  border-radius: var(--radius-md);

  border: 1px solid var(--color-border);
}

.error {
  color: #b91c1c;
}
</style>
