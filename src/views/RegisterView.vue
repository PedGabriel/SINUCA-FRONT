<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
import LogoAzul from '/logo-azul.svg'
import AppInput from '@/components/forms/AppInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import RegisterStepOne from '@/components/forms/RegisterStepOne.vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// Controle visual
const loading = ref(false);
const errorMessage = ref('');

// Query das opções
const userType = route.query.title;
const userIcon = route.query.icon;
const userColor = route.query.color;

// Cadastro 
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
}

</script>

<template>
    <section class="container">
        <header class="header-section">
            <button @click="router.back()" class="back-btn">
                <span class="mdi mdi-arrow-left-thin"></span>
            </button>
            <img :src="LogoAzul" alt="logo do SINUCA azul" style="width: auto; height: 40px">
        </header>

        <RegisterStepOne 
            :user-type="userType"
            :user-icon="userIcon"
            :user-color="userColor"
        />

    </section>
</template>

<style scoped>
.container {
    height: 100vh;
    position: relative;
    padding: 0 2rem;
    overflow: hidden;
}

.header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
}

.back-btn {
    background-color: inherit;
    border: none;
    font-size: 2.5rem;
}
</style>
