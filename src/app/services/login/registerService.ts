import api from '../api';


export interface IUserRegistration {
    name: string;
    email: string;
    tel: number;
    userName: string;
    password: string;
}

export const registration = async ({name, email, tel, userName, password}: IUserRegistration) => {
    try {
        const response = await api.post('http://localhost:5000/api/users', {
            name, email, tel, userName, password
        });
        return response.data;
        
    } catch (error) {
        throw error;
    }
};