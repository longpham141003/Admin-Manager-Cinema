import api from '../utils/api';
import { post } from '../utils/api'; 
// Đăng ký 
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        return response.data; // Dữ liệu trả về từ API
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        throw error; 
    }
};

// Đăng nhập 
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/users/login', credentials);
        return response.data; 
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        throw error;
    }
};
