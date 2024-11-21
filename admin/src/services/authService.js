// src/services/authService.js
import api from '../utils/api';
import { post } from '../utils/api'; // Import hàm post từ api.js
// Đăng ký 
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        return response.data; // Dữ liệu trả về từ API
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        throw error; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi
    }
};

// Đăng nhập 
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/users/login', credentials); // Đảm bảo đường dẫn là đúng
        return response.data; // Dữ liệu trả về từ API
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        throw error; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi
    }
};