<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';
import AppInput from '@/components/forms/AppInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import odsShape from  '/static/ods-shape.svg'
import LogoAzul from '/logo-azul.svg'

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const showPassword = ref(false);

function tooglePassword() {
    showPassword.value = !showPassword.value
}

// email e senha do usuário
const email = ref('');
const password = ref('');

// controle visual do login
const loading = ref(false);
const errorMessage = ref('');

// Query das opções
const userType = route.query.title;
const userIcon = route.query.icon;
const userColor = route.query.color;

// login 
async function login() {
    loading.value = true;
    errorMessage.value = '';
    try {
        await userStore.login(email.value, password.value);
        router.push('/');
    } catch (err){
        errorMessage.value = 'Erro ao entrar. Verifique suas credenciais.';
    } finally {
        loading.value = false;  
    }
}
</script>

<template>
    <div class="container">

        <header class="header-section">
            <button @click="router.back()" class="back-btn">
                <span class="mdi mdi-arrow-left-thin"></span>
            </button>
            <img :src="LogoAzul" alt="logo do SINUCA azul">
        </header>
        <section class="login-section">
    
            <div class="section-title">
                <h1>ENTRAR</h1>
                <p>Entre com suas credenciais.</p>
            </div>
    
            <div class="login-area">
                <div class="header-login" :style="`color: ${userColor}`">
                    <span :class="userIcon"></span>
                    <h2>{{ userType }}</h2>
                </div>
    
                <form @submit.prevent="login" class="login-form" >
                    <AppInput
                        v-model="email" 
                        label="Email"
                        placeholder="exemplo@gmail.com"
                        type="email"
                    />
                    
                    <div class="password-input">
                        <AppInput 
                            v-model="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            :type="showPassword ? 'text' : 'password'" 
                        />
                        <span class="toogle-password" @click="tooglePassword">
                            <span :class="showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></span>
                        </span>
                    </div>
                    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
                    <AppButton type="submit">ENTRAR</AppButton>
                </form>
            </div>
        </section>
        <img :src="odsShape" alt="ods shape" class="overlay-ods">
    </div>
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
    margin-top: 1.5rem;
}

.back-btn {
    background-color: #EBEBEB;
    border: none;
    padding: 1rem;
    font-size: 1.6rem;
    border-radius: 10px;
}

.section-title {
    margin: 2rem 0;
    text-align: center;

    & p {
        margin-top: 1rem;
        color: #969696;
    }   
}

.login-section {
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-area {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    padding: 2rem;
}

.header-login {
    text-align: center;
    margin-bottom: 2rem;
    & span {
        font-size: 3rem;
    }
    & h2 {
        font-weight: 600;
        font-size: 1.7rem;
        margin-top: 0.5rem;
    }
}

.login-form {
    display: flex;
    flex-direction: column;
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

.overlay-ods {
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 250px;
    width: auto;
    transform: translate(-50%, 90px) rotate(90deg);
}

.error-message {
    color: #FD151B;
}
</style>