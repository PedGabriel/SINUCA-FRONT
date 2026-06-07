<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const loading = ref(false)
const errorMessage = ref('')

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

const imgPreview = ref(null);
const focusMatriculation = ref(false);

async function onFileChange(event) {
  const file = event?.target?.file?.[0];
  if(!file) return;

  imgPreview.value = URL.createObjectURL(file);

  try {
    loading.value = true
    const response = await userStore.uploadImage(file);
    userStore.user.foto = response.data.id;
  } catch (err) {
    errorMessage.value = 'Erro ao fazer upload de imagem'
  } finally  {
    loading.value = false
  }
}

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

        <div class="avatar-upload-section">
          <div class="avatar-preview" :style="`border-color: ${props.userColor}`">
            <img v-if="imgPreview" :src="imgPreview" alt="Preview da foto" />
            <span v-else class="mdi mdi-account-camera-outline" :style="`color: ${props.userColor}`"></span>
          </div>
          <label for="file-input" class="upload-btn" :style="`background-color: ${props.userColor || '#002453'}`">
            <span class="mdi mdi-upload"></span> Selecionar Foto
          </label>
          <input 
            id="file-input" 
            type="file" 
            accept="image/*" 
            @change="onFileChange" 
            style="display: none;" 
          />
        </div>

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