// src/pages/AccountManagement.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import ActionToolbar from '../../components/ActionToolbar';
import Pagination from '../../components/Panigation';
import { useUsers } from '../../hooks'; 
import useDeleteUser from '../../hooks/user/useDeleteUser';
import './accountmanagement.css';

const AccountManagement = () => {
    const navigate = useNavigate();
    const { users, loading, errorMessage, loadUsers } = useUsers();
    const { deleteUser, loading: deleteLoading, errorMessage: deleteError } = useDeleteUser(); 
    
    

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (confirmDelete) {
            await deleteUser(userId); // Gọi hàm xóa người dùng
            loadUsers(); // Tải lại danh sách người dùng sau khi xóa
        }
    };

    return (
        <>
            <NavLink to="/admin/addaccount"><Button label="Tạo tài khoản mới" /></NavLink>
            <div className="body-content">
                <ActionToolbar />
                <div className="horizontal-line" />
                <div className="data-content">
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : errorMessage ? (
                        <p className="error-message">{errorMessage}</p>
                    ) : (
                        <>
                            {deleteLoading && <p>Đang xóa người dùng...</p>}
                            {deleteError && <p className="error-message">{deleteError}</p>}
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Họ tên</th>
                                        <th>Tên tài khoản</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Vai trò</th>
                                        <th>Lần đăng nhập cuối cùng</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <th>
                                                <input type="checkbox" />
                                            </th>
                                            <td>{user.userCode}</td>
                                            <td>{user.hoTen}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.soDienThoai}</td>
                                            <td>{user.role}</td>
                                            <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Chưa đăng nhập'}</td>
                                            <td>
                                                <button className="btn btn-edit" onClick={() => navigate(`/admin/editaccount/${user._id}`)}>
                                                    <i className="fas fa-edit" />
                                                </button>
                                                <button className="btn btn-delete" onClick={() => handleDeleteUser(user._id)}>
                                                    <i className="fas fa-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
                <Pagination />
            </div>
        </>
    );
};

export default AccountManagement;
