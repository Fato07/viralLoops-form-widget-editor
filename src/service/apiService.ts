import { FormData } from '@/components/sidebar/types';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api', 
});

export const saveWidgetSettings = async (data: FormData) => {
    try {
        const response = await api.post('/saveWidget', data); 
        return response.data;
    } catch (error) {
     console.log(error);
     return error
    }
};
