import api from '../api';


export const authLogin = async (username: string, password: string) => {
  try {
    const response = await api.post('http://localhost:5000/api/users/login', { userName: username, password });
    return response.data; // Retorna os dados da resposta

  } catch (error) {
    throw error; // Lança o erro para quem chamou a função
  }
};