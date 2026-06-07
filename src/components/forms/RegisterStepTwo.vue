<script setup>
import { ref, computed } from 'vue';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';

const props = defineProps({
  userType: String,
  userIcon: String,
  userColor: String,
})

const token = ref('')

const isDisabled = computed(() => token.value === '')

const emit = defineEmits(['nextStep'])

function nextStep() {
  emit('nextStep')
}
</script>

<template>
  <div class="container-component">
    <div class="section-title">
      <h1>TOKEN DE VERIFICAÇÃO</h1>
      <p>Digite o código enviado para o seu e-mail.</p>
    </div>

    <div class="forms-container">
      <div class="forms-header" :style="`color: ${props.userColor}`">
        <span :class="props.userIcon"></span>
        <h2>{{ props.userType }}</h2>
      </div>

      <form @submit.prevent="nextStep" class="forms">
        <AppInput 
            label="Token"
            type="text"
            v-model="token"
            required
        />

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
</style>