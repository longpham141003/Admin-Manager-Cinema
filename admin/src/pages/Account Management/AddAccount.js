import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddUser } from '../../hooks/user/useAddUser'; 
import './accountmanagement.css'; 
import Button from '../../components/button'; 

const AddAccount = () => {
    const navigate = useNavigate();
    const {
        fullName,
        setFullName,
        username,
        setUserName,
        email,
        setEmail,
        phone,
        setPhone,
        password,
        setPassword,
        role,
        setRole,
        addUser,
    } = useAddUser(); 

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const success = await addUser(); 

        if (success) {
            navigate('/admin/accountmanagement'); 
        }
    };

    return (
        <div className="body-content">
            <div className="data-content">
                <h2>Thêm nhân viên</h2>
                <form className="add-employee-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="full-name">Họ tên</label>
                        <input type="text" id="full-name" placeholder="Nhập họ tên" 
                               value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Tên tài khoản</label>
                        <input type="text" id="username" placeholder="Nhập tên tài khoản" 
                               value={username} onChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Nhập email" 
                               value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" id="phone" placeholder="Nhập số điện thoại" 
                               value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" id="password" placeholder="Nhập mật khẩu" 
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Vai trò</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="user">Khách hàng</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit"  className="btn btn-save" >Lưu</button>
                        <button type="button" className="btn btn-cancel" onClick={() => navigate('/admin/accountmanagement')}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAccount;
