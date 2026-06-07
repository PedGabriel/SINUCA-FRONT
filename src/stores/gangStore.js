import { ref } from 'vue';
import {defineStore} from 'pinia';

import GangService from '@/services/gangService'

const gangService = new GangService()

export const useGangStore = defineStore('gang', () => {
    const gangs = ref([]);

    async function getGangs() {
        const data = await gangService.getGangs();
        gangs.value = data.results;
    }

    async function getGang(id) {
        return await gangService.getGang(id);
    }

    return {
        gangs,
        getGangs,
        getGang
    }
});