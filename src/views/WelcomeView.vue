<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import LogoAzul from '/logo-azul.svg'

const router = useRouter();
const userStore = useUserStore();

const options = [
    {
        id: 1, 
        icon: "mdi mdi-crown-outline", 
        title: "Organizador", 
        desc: "Gerencie o evento e controle as atividades.",
        color: "#849324",
        border: "border: 2px solid #849324",
    },
    {
        id: 2, 
        icon: "mdi mdi-account-outline", 
        title: "Discente", 
        desc: "Represente seu país e participe das tarefas.",
        color: "#FFB30F",
        border: "border: 2px solid #FFB30F",
    },
    {
        id: 3, 
        icon: "mdi mdi-star-outline", 
        title: "Avaliador", 
        desc: "Avalie as delegações e seu desempenho.",
        color: "#FD151B",
        border: "border: 2px solid #FD151B",
    },
]

const selectUserType = ((id, title, icon, color) => {
    userStore.userType = id

    router.push({
        path: '/login',
        query: { id, title, icon, color }
    })
})
</script>

<template>
    <section class="container">
        <img :src="LogoAzul" alt="logo sinuca" class="logo"/>
        <h1>BEM-VINDO</h1>
        <p class="subtitle">Selecione como deseja acessar o sistema</p>
        <ul class="options-list">
            <li 
                v-for="opt in options"
                :key="opt.id"
                class="option-item"
                :style="opt.border"
                @click="selectUserType(opt.id, opt.title, opt.icon, opt.color)"
            >   
                <span :class="opt.icon" :style="`color: ${opt.color}`"></span>
                <h3 style="font-weight: bold;">{{ opt.title }}</h3>
                <p>{{ opt.desc }}</p>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    background-image: url('/static/fundo-continente.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
    
.subtitle{
    width: 65%;
    color: #969696;
    margin: 0.5rem auto;
}

.options-list {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    margin-top: 2rem;
}

.option-item {
    background: #F6F6F2;
    padding: 2rem 0.8rem;
    border-radius: 10px;
    box-shadow:  0 -1px 10px rgba(0, 0, 0, 0.6);
    transition: all .2s;
    width: 45%;
    height: 110px;
    margin: 0 auto;

}
.option-item p {
    color: #969696;
    margin-top: 0.5rem;
}

.option-item span {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.option-item:active {
    transform: scale(0.98);
}
</style>
