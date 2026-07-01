import axios from 'axios'

export default class CountryService{
    async getAllCountrys(){
        const {data} = await axios.get('/paises/');
        return data;
    }
    async getCountry(id){
        const {data} = await axios.get(`/paises/${id}`)
        return data
    }
}