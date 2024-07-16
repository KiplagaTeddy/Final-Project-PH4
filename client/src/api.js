// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Adjust the base URL as needed
});

export default api;
