// src/components/AdminLogin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate
import { loginUser } from '../../services/authService'; // Nhập hàm loginUser
import { useAuth } from '../../hooks/useAuth '; // Nhập useAuth từ hooks (đã xóa dấu cách thừa)
import './AdminLogin.css'; // Nhập tệp CSS

const AdminLogin = () => {
    const { login } = useAuth(); // Lấy hàm login từ AuthContext
    const [username, setUsername] = useState(''); // Đổi từ email sang username
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Quản lý thông báo lỗi
    const [loading, setLoading] = useState(false); // Quản lý trạng thái tải
    const navigate = useNavigate(); // Tạo hook điều hướng

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        console.log('Gửi yêu cầu đăng nhập với thông tin:', { username, password }); // Log thông tin đăng nhập
        try {
            const data = await loginUser({ username, password }); // Gọi hàm loginUser
            console.log('Đăng nhập thành công:', data);

            // Lưu token vào localStorage
            localStorage.setItem('token', data.token); // Giả định rằng token có trong phản hồi

            login(); // Chỉ cần gọi login() mà không cần truyền dữ liệu
            navigate('/admin/dashboard'); // Điều hướng đến Dashboard
        } catch (err) {
            // Cung cấp thông báo lỗi chi tiết hơn nếu có
            const errorMessage = err.response?.data?.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.';
            setError(errorMessage);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Đăng Nhập</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị thông báo lỗi */}
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="button" disabled={loading}>
                    {loading ? 'Đang Đăng Nhập...' : 'Đăng Nhập'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
