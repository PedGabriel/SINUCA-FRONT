<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const router = useRouter();
const route = useRoute();

const taskId = computed(() => route.params.id);

onMounted(async() => {
    await taskStore.getTask(taskId.value)
})

</script>

<template>
    <section class="task-detail">
        <div class="modal-header">
            <h2>Detalhes da tarefa</h2>
            <span class="mdi mdi-close"></span>
        </div>

        <div class="task-infos">
            <ul class="infos-list">
                <li class="info-item">
                    <h5 class="info-title">Título</h5>
                    <h3 style="font-weight: bold;">{{ taskStore.task.title }}</h3>
                </li>
                <li class="info-item">
                    <h5 class="info-title">Descrição</h5>
                    <p>{{ taskStore.task.description }}</p>
                </li>
                <li class="info-item">
                    <h5 class="info-title">Categorias</h5>
                    <ul>
                        <li v-for="cat in taskStore.task.category">{{ cat.name }}</li>
                    </ul>
                </li>
                <li class="info-item">
                    <h5 class="info-title">Responsável</h5>
                    <p>{{ taskStore.task.user }}</p>
                </li>
                <li class="info-item"></li>
                <li class="info-item"></li>
            </ul>
        </div>

    </section>

</template>