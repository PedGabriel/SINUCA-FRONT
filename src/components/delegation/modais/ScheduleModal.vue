<script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import { onMounted, ref, computed } from 'vue'
import { useCountryStore } from '@/stores/countryStore'

const props = defineProps({
    scheduleId: String,
})

const countryStore = useCountryStore()
const scheduleStore = useScheduleStore()

const formatDate = (data) => {
    if (!data) return ''
    const date = new Date(data)

    return new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
    }).format(date)
}

const formatTime = (data) => {
    if (!data) return ''
    const date = new Date(data)

    return new Intl.DateTimeFormat('pt-BR', {
        timeStyle: 'short',
    }).format(date)
}

const countrys = ref([])

onMounted(async () => {
    scheduleStore.getSchedules()
    await scheduleStore.getSchedule(props.scheduleId)

    for (const c of scheduleStore.schedule.country) {
        await countryStore.getCountry(c)
        countrys.value.push(countryStore.country)
    }
})

const nameCategory = computed(() => {
    switch (scheduleStore.schedule.category) {
        case "1":
            return 'Postagem'
        case "2":
            return 'Debate'
        case "3":
            return 'Mesa de cooperação'
        default:
            return ''
    }
})
</script>

<template>
    <section v-if="scheduleStore.schedule.category == 1"></section>
    <section v-else-if="scheduleStore.schedule.category == 2">
        <div class="header">
            <h1>{{ nameCategory }}</h1>
            <button>
                <span class="mdi mdi-close"></span>
            </button>
            <div class="countrys">
                <div>
                    <img :src="countrys[0].flag.url" alt="" />
                </div>
                <h5>
                    {{ countrys[0].name }}
                </h5>
                <span> VS </span>
                <div>
                    <img :src="countrys[1].flag.url" alt="" />
                </div>
                <h5>
                    {{ countrys[1].name }}
                </h5>
            </div>
        </div>
        <div class="topic">
            <h4>Tema do debate</h4>
            <h2>
                {{ scheduleStore.schedule.title }}
            </h2>
        </div>
        <div>
            <ul>
                <li>
                    {{ formatDate(scheduleStore.schedule.startDate) }}
                </li>
                <li>
                    {{ scheduleStore.schedule.location }}
                </li>
                <li>
                    {{ formatTime(scheduleStore.schedule.startDate) }}
                </li>
                <li>
                    {{ formatTime(scheduleStore.schedule.endDate) }}
                </li>
            </ul>
        </div>
        <div class="descricao">
            <h3>Sobre o debate</h3>
            <p>
                {{ scheduleStore.schedule.description }}
            </p>
        </div>
        <div class="docs">
            <h3> <span class="mdi mdi-file-document-outline"></span> Documentos relacionados</h3>
            <div >
                <a href=""></a>
            </div>
        </div>
    </section>
    <section v-else-if="scheduleStore.schedule.category == 3"></section>
</template>
