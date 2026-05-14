<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { ArrowRight } from "lucide-vue-next";

import BaseButton from "@/ui/components/base/BaseButton.vue";
import BaseSurface from "@/ui/components/base/BaseSurface.vue";

import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

type Mode = "login" | "register";

const mode = ref<Mode>("login");

const firstName = ref("");
const email = ref("");
const password = ref("");

const isLoading = ref(false);
const error = ref("");

const isLogin = computed(() => {
  return mode.value === "login";
});

function switchMode(next: Mode) {
  error.value = "";
  mode.value = next;
}

async function handleSubmit() {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Veuillez remplir tous les champs";
    return;
  }

  if (!isLogin.value && !firstName.value.trim()) {
    error.value = "Veuillez renseigner votre prénom";
    return;
  }

  try {
    isLoading.value = true;

    if (isLogin.value) {
      await authStore.login({
        email: email.value,
        password: password.value,
      });

      router.push("/");
      return;
    }

    await authStore.register({
      email: email.value,
      password: password.value,
      displayName: firstName.value,
    });

    router.push("/onboarding/household");
  } catch (e) {
    error.value = isLogin.value
      ? "Connexion impossible"
      : "Création du compte impossible";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="container">
      <!-- HERO -->
      <div class="hero">
        <div class="logo">🏡</div>

        <div class="hero-text">
          <h1>Mon foyer</h1>

          <p>
            Organisez votre quotidien familial simplement et chaleureusement.
          </p>
        </div>
      </div>

      <!-- FORM -->
      <BaseSurface class="form-card" padding="lg" radius="lg" elevation="md">
        <form class="form" @submit.prevent="handleSubmit">
          <!-- REGISTER ONLY -->
          <div v-if="!isLogin" class="field">
            <label> Prénom </label>

            <input
              v-model="firstName"
              type="text"
              placeholder="Martin"
              autocomplete="given-name"
            />
          </div>

          <!-- EMAIL -->
          <div class="field">
            <label> Email </label>

            <input
              v-model="email"
              type="email"
              placeholder="vous@email.com"
              autocomplete="email"
            />
          </div>

          <!-- PASSWORD -->
          <div class="field">
            <label> Mot de passe </label>

            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              :autocomplete="isLogin ? 'current-password' : 'new-password'"
            />
          </div>

          <!-- ERROR -->
          <p v-if="error" class="error">
            {{ error }}
          </p>

          <!-- ACTION -->
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :disabled="isLoading"
            full-width
          >
            <ArrowRight :size="16" />

            {{
              isLoading
                ? isLogin
                  ? "Connexion..."
                  : "Création..."
                : isLogin
                  ? "Se connecter"
                  : "Créer mon compte"
            }}
          </BaseButton>
        </form>
      </BaseSurface>

      <!-- FOOTER -->
      <div class="footer">
        <p class="footer-text">Votre espace familial sécurisé.</p>

        <button
          class="footer-link"
          @click="switchMode(isLogin ? 'register' : 'login')"
        >
          {{ isLogin ? "Créer un compte" : "J’ai déjà un compte" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
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
  gap: var(--space-5);
}

/* =========================
   HERO
========================= */

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  gap: var(--space-4);
}

.logo {
  width: 76px;
  height: 76px;

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

  font-size: 36px;

  box-shadow: var(--shadow-floating);
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.hero h1 {
  font-size: 32px;
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
  font-weight: 700;

  color: var(--color-text);
}

.field input {
  width: 100%;

  padding: 14px 16px;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-md);

  background: rgba(255, 255, 255, 0.72);

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

  background: white;

  box-shadow: 0 0 0 4px rgba(53, 92, 77, 0.12);
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

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: var(--space-2);
}

.footer-text {
  font-size: 13px;

  color: var(--color-muted);
}

.footer-link {
  border: none;
  background: transparent;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    opacity 160ms ease,
    transform 120ms ease;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-link:active {
  transform: scale(0.98);
}

/* =========================
   DESKTOP
========================= */

@media (min-width: 768px) {
  .auth-page {
    padding: 48px;
  }

  .hero h1 {
    font-size: 36px;
  }
}
</style>
