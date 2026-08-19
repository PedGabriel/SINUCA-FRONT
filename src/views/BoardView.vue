<script setup>
import AppHeaderMob from '@/components/layout/mobile/AppHeaderMob.vue'
import AppTabFooter from '@/components/layout/mobile/AppTabFooter.vue'
import CardPostComponent from '@/components/posts/CardPostComponent.vue'
</script>
<template>
    <AppHeaderMob title="Mural" />
    <main>
        <section class="banner">
            <div class="delegation-name">
                <div style="display: flex; gap: 1rem; align-items: center">
                    <h2 class="name">Mural</h2>
                    <span class="mdi mdi-bulletin-board"></span>
                </div>
                <p class="official-name">Notícias Atualizadas sobre o SINUCA</p>
            </div>
            <img src="/static/ods-shape.svg" alt="ods-shape" style="width: auto; height: 160px" />
        </section>

        <section class="post-list">
            <CardPostComponent title="Titulo para teste" date="19/08" description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain." />
        </section>
    </main>
    <AppTabFooter />
</template>
<style scoped>
.banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
}

span {
    font-size: 2rem;
}

.delegation-name {
    padding: 1em;

    & .name {
        font-weight: bold;
    }

    & .official-name {
        color: #969696;
        margin-top: 0.5rem;
    }
}

.post-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
}
</style>
