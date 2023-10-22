import axios from 'axios';

const api = axios.create({
    baseURL: '/api', 
});

//TDOO: add types for data
export const saveWidgetSettings = (data) => {
    return api.post('/saveWidget', data)
        .then((response) => { 
            return response.data;
        })
        .catch((error) =>{
            console.log(error);
            throw error;  // Propagate the error so it can be caught in calling function
        });
};
