import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService'; 
import { useAuth } from '../../hooks/useAuth '; 
import './AdminLogin.css'; 

const AdminLogin = () => {
    const { login } = useAuth(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        console.log('Gửi yêu cầu đăng nhập với thông tin:', { username, password }); 
        try {
            const data = await loginUser({ username, password }); 
            console.log('Đăng nhập thành công:', data);

            localStorage.setItem('token', data.token); 

            login();
            navigate('/admin/dashboard'); 
        } catch (err) {
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
            {error && <p style={{ color: 'red' }}>{error}</p>} 
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
