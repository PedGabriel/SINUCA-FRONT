import axios from "axios";

export default class CategoryService{
    async getAllCategorys() {
        const { data } = await axios.get('/categorias/')
        return data;
    }

    async getCategory(id) {
        const { data } = await axios.get(`/categorias/${id}`)
        return data;
    }
}