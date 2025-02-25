import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://my-marketplace-backend.onrender.com' || 'http://localhost:5000',
});

export default apiService;