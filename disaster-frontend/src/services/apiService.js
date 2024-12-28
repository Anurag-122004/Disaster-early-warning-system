import axios from 'axios';

const API_URL = 'http://localhost:5000/api/disasters/fetch-real-time';

export const fetchDisasters = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching disasters:', error);
        throw error;
    }
};
