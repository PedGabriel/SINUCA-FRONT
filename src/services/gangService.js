import axios from 'axios';

export default class GangService{
    async getGangs(){
        const {data} = await axios.get('/turmas/');
        return data;
    }
    async getGang(id){
        const {data} = await axios.get(`turmas/${id}`);
        return data;
    }
}