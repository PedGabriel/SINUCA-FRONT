<script setup>
import AppLayout from '../components/layout/AppLayout.vue';
import UnderConstruction from '../components/layout/UnderConstruction.vue';
</script>

<template>
    <AppLayout title="Chat">
        <UnderConstruction
            icon="mdi mdi-chat-processing-outline"
            title="Chat em construção"
            subtitle="Em breve você vai poder conversar com sua delegação e outros participantes por aqui."
        />
    </AppLayout>
</template>