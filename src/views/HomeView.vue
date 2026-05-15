<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
    <button @click="router.push('/p')">playground</button>
    <button @click="router.push('/delegacao')">delegacao</button>
</template>

<style scoped>
</style>