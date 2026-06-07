<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import AppButton from './AppButton.vue'
import AppInput from './AppInput.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const loading = ref(false);
const errorMessage = ref('');
const focusMatriculation = ref(false);

const props = defineProps({
  userId: String,
  userType: String,
  userIcon: String,
  userColor: String,
});

const previewUrl = ref(null);
const selectedFile = ref(null);

const requirements = computed(() => {
  return [
    {
      requirement: 'Digite uma matrícula válida',
      valid:
        userStore.user.matriculation.length < 10 ||
        userStore.user.matriculation.length > 10 ||
        !/^[0-9]+$/.test(userStore.user.matriculation),
    },
  ]
})

function handleImage(event) {
  const file = event.target.files[0];
  if(!file) return
  
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

async function register() {
  loading.value = true
  errorMessage.value = ''


  try {
    if(selectedFile.value) {
      const response = await userStore.uploadImage(selectedFile.value);
      console.log('UPLOAD RESPONSE:', response.data)
      userStore.user.foto = response.data.id
    }
    await userStore.register(
      userStore.user.email,
      userStore.user.name,
      userStore.user.password,
      userStore.user.gang,
      userStore.user.matriculation,
      userStore.user.foto,
    )
    router.push('/')
  } catch (err) {
    errorMessage.value = 'Erro ao cadastrar. Verifique suas credenciais'
  } finally {
    loading.value = false
  }
}
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
        <div class="image-section">
          <label class="avatar">
            <img v-if="previewUrl" :src="previewUrl" alt="foto do usuário" />

            <span v-else class="avatar-placeholder">
              <i class="mdi mdi-camera"></i>
            </span>

            <input
              type="file"
              accept="image/jpeg, image/png"
              @change="handleImage"
            />
          </label>
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
        <span style="color: #fd151b" v-if="requirements[0].valid && focusMatriculation">
          <span class="mdi mdi-alert-circle-outline" />
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


.image-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f1f1f1;
  border: 2px dashed #ccc;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.avatar:hover {
  border-color: #666;
  background: #eaeaea;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar input {
  display: none;
}

.avatar-placeholder {
  color: #999;
  font-size: 2rem;
}
</style>
