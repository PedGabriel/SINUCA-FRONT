<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';

const userStore = useUserStore();

const props = defineProps({
  userId: String,
  userType: String,
  userIcon: String,
  userColor: String,
});

const requirements = computed(() => {
  return [
    { requirement: 'Digite uma matrícula válida', valid: userStore.user.matriculation.length < 10 || userStore.user.matriculation.length > 10 || !/^[0-9]+$/.test(userStore.user.matriculation)}
  ]
});

const focusMatriculation = ref(false);

async function register() {
    loading.value = true
    errorMessage.value = ''
    try {
        await userStore.register(user.value.email, user.value.name, user.value.password, user.value.gang, user.value.matriculation, user.value.foto);
        router.push('/');
    } catch (err) {
        errorMessage.value = 'Erro ao cadastrar. Verifique suas credenciais';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
  <div class="container-component">
    <div class="section-title">
      <h1>QUASE LÁ!</h1>
      <p>Complete suas informações para finalizar seu cadastro.</p>
    </div>

    <div class="forms-container">
      <div class="forms-header" :style="`color: ${props.userColor}`">
        <span :class="props.userIcon"></span>
        <h2>{{ props.userType }}</h2>
      </div>

      <form @submit.prevent="register" class="forms">
          <AppInput 
            v-model="userStore.user.name"
            label="Nome Completo"
            type="text"
            placeholder="Digite seu nome."
            required
          />
          <AppInput 
            v-if="userId === '2'"
            v-model="userStore.user.matriculation"
            label="Matrícula"
            type="text"
            placeholder="Digite sua matrícula."
            @focus="focusMatriculation = true"
            @blur="focusMatriculation = false"
            required
          />
        <span
          style="color: #FD151B;"
          v-if="requirements[0].valid && focusMatriculation"
        >
          <span class="mdi mdi-alert-circle-outline"
          />
          {{ requirements[0].requirement }}</span
        >
          <AppButton type="submit">CADASTRAR</AppButton>
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
</style>