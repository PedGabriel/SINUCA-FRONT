import { ref } from "vue";
import { defineStore } from "pinia";
import CountryService from "@/services/countryService";

const countryService = new CountryService();

export const useCountryStore = defineStore('country', () => {
    const countrys = ref([]);
    const country = ref();

    async function getCountrys() {
        const data = await countryService.getAllCountrys();
        countrys.value = data.results;
    }

    async function getCountry(id) {
        const data = await countryService.getCountry(id);
        country.value = data
    }

    return {
        countrys,
        country,
        getCountrys,
        getCountry,
    }
});