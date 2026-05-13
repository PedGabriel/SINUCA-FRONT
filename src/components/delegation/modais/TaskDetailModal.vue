<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const router = useRouter()
const route = useRoute()

const emits = defineEmits(['close'])
const taskId = computed(() => route.params.id)

onMounted(async () => {
    await taskStore.getTask(taskId.value)
})
</script>

<template>
    <template>
        <main>
            <div class="background"></div>
            <section class="task-detail">
                <div class="header-section">
                    <h1 style="font-size: 1.7rem">Detalhes Tarefa</h1>
                    <span class="mdi mdi-close" style="color: #969696; font-size: 2rem" @click="emits('close')"></span>
                </div>

                <form @submit.prevent="addTask(task)" class="task-form">
                    <AppInput label="Título" placeholder="Ex: Estudar temas do debate." required v-model="taskStore.task.title" />

                    <label for="desc" class="label-class">Descrição</label>
                    <textarea v-model="taskStore.task.description" id="desc" class="text-area-class"
                        placeholder="Digite a descrição da usa tarefa aqui." />

                    <p class="label-class">Categoria <span style="color: #fd151b">*</span></p>
                    <div class="categories">
                        <div :class="['category-option', task.category.includes(c.id) ? 'active' : '']"
                            v-for="c in categories" :key="c.id" @click="toggleCategory(c)"
                            :style="taskStore.task.category.includes(c.id) ? c.activeStyle : ''">
                            <p style="font-size: 0.9rem"><span :class="c.icon"></span> {{ c.name }}</p>
                        </div>
                    </div>

                    <!-- Data de início e fim da tarefa -->
                    <div class="date-row">
                        <AppInput v-model="taskStore.task.startDate" label="Início" type="date" />

                        <AppInput v-model="taskStore.task.endDate" label="Fim" type="date" />
                    </div>

                    <!-- Notificações -->

                    <div :class="['notification-area', taskStore.task.notification ? 'active-notification' : '']">
                        <div class="title-area">
                            <span
                                :class="taskStore.task.notification ? 'mdi mdi-bell-outline' : 'mdi mdi-bell-off-outline'"></span>
                            <div>
                                <h4 class="title-class">Notificações</h4>
                                <p>{{ taskStore.task.notification ? 'Receber notificações' : 'Sem notificações' }}</p>
                            </div>
                        </div>
                        <label class="switch">
                            <input type="checkbox" v-model="taskStore.task.notification" />
                            <span class="slider"></span>
                        </label>
                    </div>

                    <AppButton type="submit"> ADICIONAR </AppButton>
                </form>
            </section>
        </main>
    </template>
</template>
