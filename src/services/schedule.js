import axios from 'axios';

export default class ScheduleService {
    async getSchedules() {
        const { data } = await axios.get('/cronogramas/');
        return data;
    }
    async getSchedule(id) {
        const { data } = await axios.get(`/cronogramas/${id}/`);
        return data;
    }
    async createSchedule(schedule) {
        const { data } = await axios.post('/cronogramas/', schedule);
        return data;
    }
    async updateSchedule(id, schedule) {
        const { data } = await axios.patch(`/cronogramas/${id}/`, schedule);
        return data;
    }
    async deleteSchedule(id) {
        await axios.delete(`/cronogramas/${id}/`);
    }
}