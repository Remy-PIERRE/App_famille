<script setup lang="ts">
import { useRouter } from "vue-router";

import BaseButton from "@/ui/components/base/BaseButton.vue";
import BaseSurface from "@/ui/components/base/BaseSurface.vue";

const router = useRouter();
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="hero">
        <div class="emoji">🏡</div>

        <h1>Configurez votre foyer</h1>

        <p>
          Créez un nouveau foyer familial ou rejoignez celui de vos proches.
        </p>
      </div>

      <BaseSurface class="card" padding="lg" radius="lg">
        <div class="actions">
          <BaseButton
            full-width
            size="lg"
            @click="router.push('/onboarding/create')"
          >
            Créer un foyer
          </BaseButton>

          <BaseButton
            variant="secondary"
            full-width
            size="lg"
            @click="router.push('/onboarding/join')"
          >
            Rejoindre un foyer
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
  gap: var(--space-6);
}

.hero {
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.emoji {
  font-size: 52px;
}

.hero h1 {
  font-size: 30px;
  font-weight: 800;
}

.hero p {
  color: var(--color-muted);

  line-height: 1.6;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
</style>
