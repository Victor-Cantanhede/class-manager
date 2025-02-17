import axios from 'axios';


// Cria uma instância do Axios com a URL do backend
const api = axios.create({
  baseURL: 'http://localhost:5000' // Use a URL onde seu backend está rodando
});

export default api;