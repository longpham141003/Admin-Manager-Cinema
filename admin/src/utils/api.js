import axios from 'axios';
console.log('Base URL:', process.env.REACT_APP_BASE_URL);
const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT),
    headers: { 'Content-Type': 'application/json' },
});


export default api;
