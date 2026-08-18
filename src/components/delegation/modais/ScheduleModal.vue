<script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import { useCountryStore } from '@/stores/countryStore'
import { useLinkStore } from '@/stores/linkStore'
import { onMounted, ref, computed, onUnmounted } from 'vue'


const props = defineProps({
    scheduleId: String,
})

const countryStore = useCountryStore()
const scheduleStore = useScheduleStore()
const linkStore = useLinkStore()

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
const links = ref([])

onMounted(async () => {
    //document.body.style.overflow = 'hidden'
    scheduleStore.getSchedules()
    await scheduleStore.getSchedule(props.scheduleId)

    for (const c of scheduleStore.schedule.country) {
        await countryStore.getCountry(c)
        countrys.value.push(countryStore.country)
    }
    for (const d of scheduleStore.schedule.docs) {
        await linkStore.getLink(d)
        links.value.push(linkStore.link)
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

const emits = defineEmits(['close']);

/*onUnmounted(() => {
  document.body.style.overflow = ''
})*/

</script>

<template>
    <div class="background" @click="emits('close')"></div>
    <section v-if="scheduleStore.schedule.category == 1" class="modal"></section>
    <section v-else-if="scheduleStore.schedule.category == 2" class="modal">
        <div class="header">
            <div class="title">
            <h2>Debate</h2>
            
            <span class="mdi mdi-close"
            style="color: #969696; font-size: 2rem"          @click="emits('close')"
            ></span>
            
            </div>
            <div class="countrys">
                <div>
                    <img :src="countrys[0].flag.url" alt="" />
                    <h5>
                    {{ countrys[0].name }}
                    </h5>
                </div>
                <span> VS </span>
                <div>
                    <img :src="countrys[1].flag.url" alt="" />
                    <h5>
                    {{ countrys[1].name }}
                    </h5>
                </div>
            </div>
        </div>
        <div class="topic">
            <h4>Tema do debate</h4>
            <h3>
                {{ scheduleStore.schedule.title }}
            </h3>
        </div>
        <div>
            <ul class="schedules-infos">
                <li>
                    <span class="mdi mdi-calendar-month-outline"></span>
                    {{ formatDate(scheduleStore.schedule.startDate) }}
                </li>
                <li>
                    <span class="mdi mdi-map-marker-outline"></span>
                    {{ scheduleStore.schedule.location }}
                </li>
                <li>
                    <span class="mdi mdi-clock-outline"></span>
                    {{ formatTime(scheduleStore.schedule.startDate) }}
                </li>
                <li>
                    <span class="mdi mdi-clock-outline"></span>
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
            <div v-for="link in links" :key="link.id">
                <a :href="link.url" target="_blank">{{ link.name }}</a>
            </div>
        </div>
    </section>
    <section v-else-if="scheduleStore.schedule.category == 3" class="modal"></section>
</template>

<style scoped>
/*
.background {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  backdrop-filter: blur(2px);
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  height: 100vh;
  width: 100%;
}
.modal{
    z-index: 20;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
}*/

.header {
    
}
.title {
    display: flex;
    justify-content: space-between;
}
.countrys {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 500;
}
img {
    width: 5rem;
    height: auto;
    border-radius: 10%;
}
.topic {
    margin-top: 3vw;
    border: 2px solid #b6b6b6;
    padding: 1rem;
    border-radius: 10px;
}
.topic h4 {
    color: #01295F; 
    
}
.topic h3 {
    font-weight: 700;
    font-size: 1.1rem;
    margin-top: 0.5rem;
}

.schedules-infos{
    display: flex;
}

</style>
