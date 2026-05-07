<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/useAuthStore"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseButton from "@/components/ui/BaseButton.vue"
import BaseInput from "@/components/ui/BaseInput.vue"

const name = ref("")
const router = useRouter()
const auth = useAuthStore()

async function login() {
  if (!name.value) return

  await auth.login(name.value)
  router.push("/")
}
</script>

<template>
  <div class="page">
    <BaseCard class="card">
      <h1>Connexion</h1>

      <BaseInput v-model="name" placeholder="Votre prénom" />

      <BaseButton label="Se connecter" @click="login" />
    </BaseCard>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9f9f9;
}

.card {
  width: 100%;
  max-width: 320px;
}
</style>