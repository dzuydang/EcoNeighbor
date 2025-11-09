import axios from 'axios';

const BASE = 'http://localhost:3000';

const client =  axios.create({
  baseURL: BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  response => response,
  error => {
    const payload = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };
    return Promise.reject(payload);
  }
);

export default client;