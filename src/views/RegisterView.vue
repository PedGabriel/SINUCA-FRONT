<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
import RegisterStepOne from '@/components/forms/RegisterStepOne.vue';
import RegisterStepTwo from '@/components/forms/RegisterStepTwo.vue';
import odsShape from  '/static/ods-shape.svg'
import LogoAzul from '/logo-azul.svg'
import RegisterStepThree from '@/components/forms/RegisterStepThree.vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// Controle visual
const loading = ref(false);
const errorMessage = ref('');

// Query das opções
const userId = route.query.id;
const userType = route.query.title;
const userIcon = route.query.icon;
const userColor = route.query.color;

// Controle dos passos para o Cadastro
const currentStep = ref(1);
const backStep = () => {
    if(currentStep.value === 1) {
        router.back()
    }
    else {
        currentStep.value--
    }
}

</script>

<template>
    <section class="container">
        <header class="header-section">
            <button @click="backStep" class="back-btn">
                <span class="mdi mdi-arrow-left-thin"></span>
            </button>
            <img :src="LogoAzul" alt="logo do SINUCA azul" style="width: auto; height: 40px">
        </header>

        <RegisterStepOne 
            v-if="currentStep === 1"
            :user-type="userType"
            :user-icon="userIcon"
            :user-color="userColor"
            @next-step="currentStep++"
        />
        <RegisterStepTwo 
            v-if="currentStep === 2"
            :user-type="userType"
            :user-icon="userIcon"
            :user-color="userColor"
            @next-step="currentStep++"
        />

        <RegisterStepThree 
            v-if="currentStep === 3"
            :user-id="userId"
            :user-type="userType"
            :user-icon="userIcon"
            :user-color="userColor"

        />
        <img :src="odsShape" alt="ods shape" class="overlay-ods">
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

.overlay-ods {
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 250px;
    width: auto;
    transform: translate(-50%, 90px) rotate(90deg);
}
</style>
