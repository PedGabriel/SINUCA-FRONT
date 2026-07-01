<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Título Banner'
    },
    icon: String,
    subtitle: String,
    CountryFlagUrl: String, 
});
</script>

<template>
    <section class="banner">
        <div class="title-area">
            <div style="display: flex; gap: 1rem; align-items: center;">
                <h2 class="title">{{ title }}</h2>
                <img class="country-flag" v-if="CountryFlagUrl" :src="CountryFlagUrl" :alt="title">
            </div>
            <p class="subtitle">{{ subtitle }}</p>
        </div>
        <img src="/static/ods-shape.svg" alt="ods-shape" style="width: auto; height: 160px;">
    </section>
</template>

<style scoped>
.banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
}

.title-area {

    padding: 1em;

    & .title {
        font-weight: bold;
    }

    & .subtitle {
        color: #969696;
        margin-top: 0.5rem;
    }
}

.country-flag {
    width: 35px;
    height: auto;
}

</style>