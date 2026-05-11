<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import BaseButton from "@/ui/components/base/BaseButton.vue";
import BaseSurface from "@/ui/components/base/BaseSurface.vue";
import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const isLoading = ref(false);
const error = ref("");

async function handleLogin() {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Veuillez remplir tous les champs";
    return;
  }

  try {
    isLoading.value = true;

    await authStore.login({ email: email.value, password: password.value });

    router.push("/");
  } catch (e) {
    error.value = "Connexion impossible";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <div class="container">
      <!-- HERO -->
      <div class="hero">
        <div class="logo">🏡</div>

        <h1>Mon foyer</h1>

        <p>Organisez votre quotidien familial simplement et chaleureusement.</p>
      </div>

      <!-- FORM -->
      <BaseSurface class="form-card" padding="lg" radius="lg" elevation="md">
        <form class="form" @submit.prevent="handleLogin">
          <div class="field">
            <label>Email</label>

            <input
              v-model="email"
              type="email"
              placeholder="vous@email.com"
              autocomplete="email"
            />
          </div>

          <div class="field">
            <label>Mot de passe</label>

            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
            />
          </div>

          <p v-if="error" class="error">
            {{ error }}
          </p>

          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :disabled="isLoading"
            full-width
          >
            {{ isLoading ? "Connexion..." : "Se connecter" }}
          </BaseButton>
        </form>
      </BaseSurface>

      <!-- FOOTER -->
      <p class="footer-text">Votre espace familial sécurisé.</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--space-6) var(--space-4);

  background: radial-gradient(circle at top, #f7f5ef 0%, var(--color-bg) 65%);
}

.container {
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* =========================
   HERO
========================= */

.hero {
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.logo {
  width: 74px;
  height: 74px;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 24px;

  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-soft)
  );

  color: white;

  font-size: 34px;

  box-shadow: var(--shadow-floating);
}

.hero h1 {
  font-size: 30px;
  font-weight: 800;

  color: var(--color-text);
}

.hero p {
  font-size: 15px;
  line-height: 1.6;

  color: var(--color-muted);
}

/* =========================
   FORM
========================= */

.form-card {
  backdrop-filter: blur(14px);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field label {
  font-size: 14px;
  font-weight: 600;

  color: var(--color-text);
}

.field input {
  width: 100%;

  padding: 14px 16px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  background: rgba(255, 255, 255, 0.7);

  color: var(--color-text);

  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
}

.field input::placeholder {
  color: #9ca3af;
}

.field input:focus {
  outline: none;

  border-color: var(--color-primary);

  box-shadow: 0 0 0 4px rgba(53, 92, 77, 0.12);

  background: white;
}

/* =========================
   ERROR
========================= */

.error {
  padding: 12px 14px;

  border-radius: var(--radius-md);

  background: rgba(220, 38, 38, 0.08);

  color: #b91c1c;

  font-size: 14px;
  font-weight: 500;
}

/* =========================
   FOOTER
========================= */

.footer-text {
  text-align: center;

  font-size: 13px;
  color: var(--color-muted);
}

/* =========================
   DESKTOP
========================= */

@media (min-width: 768px) {
  .login-page {
    padding: 48px;
  }

  .hero h1 {
    font-size: 34px;
  }
}
</style>
