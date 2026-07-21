import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getBills = async () => {
  const response = await api.get('/bills');
  return response.data;
};

export const createBill = async (billData) => {
  const response = await api.post('/bills', billData);
  return response.data;
};

export const updateBill = async (id, billData) => {
  const response = await api.put(`/bills/${id}`, billData);
  return response.data;
};

export const deleteBill = async (id) => {
  const response = await api.delete(`/bills/${id}`);
  return response.data;
};

export const getAIAdvice = async () => {
  const response = await api.post('/ai/advice');
  return response.data;
};

export default api;
