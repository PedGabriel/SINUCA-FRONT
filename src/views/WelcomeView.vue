<script setup>
import LogoAzul from '/logo-azul.svg'
</script>

<template>
    <section class="container">
        <img :src="LogoAzul" alt="logo sinuca" class="logo"/>
        <h1>BEM-VINDO</h1>
        <h3>Selecione como deseja acessar o sistema</h3>
        <ul class="option-list">
            <li class="organizer">
                <span class="mdi mdi-crown-outline"></span>
                <h3>Organizador</h3>
                <p>Gerencie o evento e controle as atividades.</p>
            </li>
            <li class="student">
                <span class="mdi mdi-account-outline"></span>
                <h3>Discente</h3>
                <p>Represente seu país e participe das tarefas.</p>
            </li>
            <li class="appraiser">
                <span class="mdi mdi-star-outline"></span>
                <h3>Avaliador</h3>
                <p>Avalie as delegações e seu desempenho.</p>
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
    height: 100vh;
    background-image: url('/fundo-continente.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.container p {
    color: #;
}

.option-list li{

}

</style>
