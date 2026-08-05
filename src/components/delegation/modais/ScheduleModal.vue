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

    if (props.scheduleId == 1) {
        nameCategory.value = 'Postagem';
    }
    else if (props.scheduleId == 2) {
        nameCategory.value = 'Debate';
    }
    else if (props.scheduleId == 3) {
        nameCategory.value = 'Mesa de cooperação';
    }

    

</script>

<template>
    <section v-if="scheduleId == 1">

    </section>
    <section v-else-if="scheduleId == 2">
        <div class="header">
            <h1>{{ nameCategory }}</h1>
            <a>
                <span class="mdi mdi-close"></span>
            </a>
            <div>
                
            </div>
        </div>
        <div>
            <h4></h4>
        </div>
    </section>
    <section v-else-if="scheduleId == 3">
        
    </section>

</template>
