<script setup>
const props = defineProps({
    title: String,
    date: String,
    description: String,
    imageUrl: String,
});
</script>

<template>
    <div class="card">
        <div class="header-post">
            <h3 class="post-title">{{ props.title }}</h3>
            <span class="post-date">{{ props.date }}</span>
        </div>

        <p class="post-desc">{{ props.description }}</p>

        <img class="img-post" v-if="props.imageUrl" :src="props.imageUrl">
    </div>
</template>

<style scoped>
.card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(161, 161, 161, 0.5);
}

.header-post {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    & .post-title {
        font-size: 1.2rem;
        font-weight: bold;
    }

    &  .post-date {
        font-size: 1rem;
        border: 3px solid #01295f;
        border-radius: 8px;
        padding: 0.1rem 0.5rem;
    }
}

.post-desc {
    font-size: 0.9rem;
    text-align: justify;
    color: #969696;

}

</style>