<script setup>
const props = defineProps({
    scheduleId: String,
});

import { useScheduleStore } from "@/stores/scheduleStore";
import { onMounted } from "vue";

const scheduleStore = useScheduleStore();

onMounted(() => {
  scheduleStore.getSchedules();
  scheduleStore.getSchedule(props.scheduleId);
});

    function getCategory (){
        if (schedule.category == 1) {
            categoryName.value = 'Postagem'
        }
        else if (schedule.category == 2) {
            categoryName.value = 'Debate'
        }
        else if (schedule.category == 3) {
            categoryName.value = 'Mesa de cooperação'
        }
    }

    
</script>

<template>
    <div class="azul">

    </div>
    <div class="header">
        <h1>{{ scheduleStore.categoryName }}</h1>
    </div>
</template>