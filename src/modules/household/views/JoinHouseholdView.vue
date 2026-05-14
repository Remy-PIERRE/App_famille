<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import BaseButton from "@/ui/components/base/BaseButton.vue";
import BaseSurface from "@/ui/components/base/BaseSurface.vue";

import { useAuthStore } from "@/stores/useAuthStore";

import { householdServiceFirebase } from "../services";
import { useHouseholdStore } from "@/stores/useHouseholdStore";

const router = useRouter();

const authStore = useAuthStore();

const inviteCode = ref("");

const isLoading = ref(false);

const error = ref("");

async function joinHousehold() {
  if (!authStore.user) {
    return;
  }

  if (!inviteCode.value.trim()) {
    error.value = "Veuillez saisir un code";
    return;
  }

  try {
    isLoading.value = true;

    const household = await householdServiceFirebase.join(authStore.user.id, {
      inviteCode: inviteCode.value.trim().toUpperCase(),
    });

    await authStore.updateUser({
      householdId: household.id,
    });

    const householdStore = useHouseholdStore();
    await householdStore.init();

    router.push("/");
  } catch (e) {
    error.value = "Code invalide";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="hero">
        <h1>Rejoindre un foyer</h1>

        <p>Entrez le code partagé par votre famille.</p>
      </div>

      <BaseSurface padding="lg" radius="lg">
        <div class="form">
          <div class="field">
            <label> Code invitation </label>

            <input v-model="inviteCode" type="text" placeholder="ABCD12" />
          </div>

          <p v-if="error" class="error">
            {{ error }}
          </p>

          <BaseButton
            full-width
            size="lg"
            :disabled="isLoading"
            @click="joinHousehold"
          >
            {{ isLoading ? "Connexion..." : "Rejoindre" }}
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

  text-transform: uppercase;
}

.error {
  color: #b91c1c;
}
</style>
