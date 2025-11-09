import axios from 'axios';


const client =  axios.create({
  baseURL: import.meta.env.BASE_BACKEND_URL,
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