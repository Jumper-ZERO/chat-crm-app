import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.API_URL || 'http://localhost:3000',
  withCredentials: true, // Cookies config
});