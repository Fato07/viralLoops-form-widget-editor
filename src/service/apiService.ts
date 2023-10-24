import axios from 'axios';

const api = axios.create({
    baseURL: '/api', 
});

// TODO: Add types for the data parameter
export const saveWidgetSettings = (data: any) => {
    return api.post('/saveWidget', data)
        .then((response) => { 
            return response.data;
        })
        .catch((error) =>{
            console.log(error);
            throw error; 
        });
};
