<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { onMounted, ref } from "vue";


const props = defineProps({
    scheduleId: String,
});

const scheduleStore = useScheduleStore();

onMounted(() => {
  scheduleStore.getSchedules();
  scheduleStore.getSchedule(props.scheduleId);
});

const nameCategory = ref('')

    if (scheduleStore.schedule.category == 1) {
        nameCategory.value = 'Postagem';
    }
    else if (scheduleStore.schedule.category == 2) {
        nameCategory.value = 'Debate';
    }
    else if (scheduleStore.schedule.category == 3) {
        nameCategory.value = 'Mesa de cooperação';
    }

    

</script>

<template>
    <section v-if="scheduleStore.schedule.category == 1">

    </section>
    <section v-else-if="scheduleStore.schedule.category == 2">
        <div class="header">
            <h1>{{ nameCategory }}</h1>
            <button>
                <span class="mdi mdi-close"></span>
            </button>
            <div>
                
            </div>
        </div>
        <div class="topic">
            <h4>
                Tema do debate
            </h4>
            <h2>
                {{ scheduleStore.schedule.title }}
            </h2>
        </div>

    </section>
    <section v-else-if="scheduleStore.schedule.category == 3">
        
    </section>

</template>
