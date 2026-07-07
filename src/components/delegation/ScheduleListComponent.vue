<script setup>
import { onMounted } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore'

const scheduleStore = useScheduleStore()

onMounted(() => {
    scheduleStore.getSchedules();
});


const formatDate = (dateString) => {
    if(!dateString) return '';
    const date = new Date(dateString);

    const day = String(date.getDate().padStart(2, '0'));
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    return `${day}/${month}`;
}


</script>

<template>

<section>
    <div class="header-section">
        <h4 style="font-weight: bolder; font-size: 1.2rem">Cronograma</h4>
    </div>
        <ul>
            <li v-for="s in scheduleStore.schedules" :key="s.id" class="schedule-item">
                <div class="header-schedule">
                    <span>
                        temp
                    </span>
                    <p>
                        {{ formatDate(s.endDate) }}
                    </p>
                </div>
                <h3>
                    {{ s.title }}
                </h3>
                <p>
                    Clique para ver mais detalhes.
                </p>
            </li>
        </ul>
</section>
</template>

<style scoped>

ul {
    gap: 1rem;
    
}

.schedule-item {
    margin-top: 1rem;
    padding: 2rem;
    background-color: #fff;
    border-radius: 0.8rem;
}

</style>