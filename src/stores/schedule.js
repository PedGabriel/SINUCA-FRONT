import ScheduleStore from './ScheduleStore';

const scheduleStore = new ScheduleStore();

export const useScheduleStore = defineStore('schedule', () => {
    
    const schedules = ref([]);
    const schedule = ref({
        category: 0,
        title: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
    });
    
    const loading = ref(false);

    async function getSchedules() {
        loading.value = true;
        try {
            const data = await scheduleStore.getSchedules();
            schedules.value = data.results;
        } finally {
            loading.value = false;
        }
    }

    async function getSchedule(id) {
        schedule.value = await scheduleStore.getSchedule(id);
    }

    async function createSchedule(newSchedule) {
        const createdSchedule = await scheduleStore.createSchedule(newSchedule);
        schedules.value.push(createdSchedule);
    }

    async function updateSchedule(id, updatedSchedule) {
        const updated = await scheduleStore.updateSchedule(id, updatedSchedule);
        const index = schedules.value.findIndex(t => t.id === id);
        if (index !== -1) {
            schedules.value[index] = updated;
        }
    }
    
    async function deleteSchedule(id) {
        await scheduleStore.deleteSchedule(id);
        schedules.value = schedules.value.filter(t => t.id !== id);
    }

    return {
        schedules,
        schedule,
        getSchedules,
        getSchedule,
        createSchedule,
        updateSchedule,
        deleteSchedule
    }
})