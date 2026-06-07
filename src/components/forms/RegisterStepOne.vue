<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import AppInput from './AppInput.vue'
import AppButton from './AppButton.vue'

const userStore = useUserStore()

// props para o tipo do usuário
const props = defineProps({
  userType: String,
  userIcon: String,
  userColor: String,
})

// controle visual da senha
const showPassword = ref(false)
const focusPassword = ref(false)
const focusEmail = ref(false)

function tooglePassword() {
  showPassword.value = !showPassword.value
}

const requirements = computed(() => {
  return [
    { requirement: 'Mínimo de 8 caracteres', valid: userStore.user.password.length >= 8 },
    { requirement: 'Insira um email válido', valid: userStore.user.email.includes('@') },
  ]
})

const isDisabled = computed(() => {
  return !requirements.value[0].valid || !requirements.value[1].valid
})

const emit = defineEmits(['nextStep'])

function nextStep() {
  if (userStore.user.email && userStore.user.password) {
    emit('nextStep')
  }
}
</script>

<template>
  <div class="container-component">
    <div class="section-title">
      <h1>CADASTRE-SE</h1>
      <p>Email Institucional e senha</p>
    </div>

    <div class="forms-container">
      <div class="forms-header" :style="`color: ${props.userColor}`">
        <span :class="props.userIcon"></span>
        <h2>{{ props.userType }}</h2>
      </div>
      <form @submit.prevent="nextStep" class="forms">
        <AppInput
          @focus="focusEmail = true"
          @blur="focusEmail = false"
          label="Email"
          placeholder="Digite seu email"
          type="email"
          v-model="userStore.user.email"
          required
        />
        <span
          v-if="focusEmail"
          style="margin-bottom: 1rem"
          :style="requirements[1].valid ? 'color: #849324;' : 'color: #FD151B;'"
        >
          <span
            :class="
              requirements[1].valid
                ? 'mdi mdi-check-circle-outline'
                : 'mdi mdi-alert-circle-outline'
            "
          />
          {{ requirements[1].requirement }}</span
        >
        <div class="password-input">
          <AppInput
            @focus="focusPassword = true"
            @blur="focusPassword = false"
            label="Senha"
            placeholder="Digite sua senha"
            :type="showPassword ? 'text' : 'password'"
            v-model="userStore.user.password"
            required
          />
          <span class="toogle-password" @click="tooglePassword">
              <span :class="showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></span>
            </span>
        </div>
        <span
          v-if="focusPassword"
          :style="requirements[0].valid ? 'color: #849324;' : 'color: #FD151B;'"
        >
          <span
            :class="
              requirements[0].valid
                ? 'mdi mdi-check-circle-outline'
                : 'mdi mdi-alert-circle-outline'
            "
          />
          {{ requirements[0].requirement }}</span
        >
        <AppButton type="submit" :disabled="isDisabled">CONTINUAR</AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  text-align: center;
  margin-bottom: 2rem;

  & p {
    color: #969696;
    margin-top: 1rem;
  }
}

.forms-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  padding: 2rem;
}

.forms {
  display: flex;
  flex-direction: column;
}

.container-component {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.forms-header {
  text-align: center;
  margin-bottom: 1rem;

  & span {
    font-size: 3rem;
  }

  & h2 {
    font-weight: 600;
    font-size: 1.7rem;
    margin-top: 0.5rem;
  }
}

.password-input {
    position: relative;
}

.toogle-password {
    position: absolute;
    right: 20px;
    top: 45%;
    font-size: 1.2rem;
    color: #002453;
}


</style>
