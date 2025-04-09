import api from '../api';

export const getClasses = async (userId: string) => {
    try {
        const response = await api.get(`http://localhost:5000/api/classes?userId=${userId}`);
        return response.data;

    } catch (error) {
        throw error;
    }
};