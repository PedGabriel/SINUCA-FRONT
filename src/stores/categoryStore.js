import { defineStore } from "pinia";
import { ref } from "vue";

import CategoryService from "@/services/categoryService";

const CategoryService = new CategoryService();

export const CategoryStore = defineStore('categoria', () => {
    const categorys = ref([]);
    const category = ref();

    const loading = ref(false);

    async function getCategorys() {
        loading.value = true
        try {
            const data = await CategoryService.getAllCategorys()
            categorys.value = data.results;
        }
        finally {
            loading.value = false
        }
    }

    return {
        getCategorys,
        categorys
    }
});