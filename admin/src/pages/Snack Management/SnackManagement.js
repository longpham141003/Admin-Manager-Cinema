import React from 'react';
import "./snackmanagement.css";
import Button from "../../components/button";
import ActionToolbar from '../../components/ActionToolbar';
import Panigation from "../../components/Panigation";
import { useSnack } from '../../hooks/snack/useSnack';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { useDeleteSnacks } from '../../hooks/snack/useDeleteSnack';

const SnackManagement = () => {
    const { snacks, loading, errorMessage, loadSnacks } = useSnack();
    const navigate = useNavigate();
    const { deleteSnack, loading: deleteLoading, errorMessage: deleteError } = useDeleteSnacks();

    const handleDeleteSnack = async (snackId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (confirmDelete) {
            await deleteSnack(snackId); // Gọi hàm xóa người dùng
            loadSnacks(); // Tải lại danh sách người dùng sau khi xóa
        }
    };
    return (
        <>
            <NavLink to="/admin/addsnack">
                <Button label="Thêm bắp hoặc nước mới" />
            </NavLink>
            <div className="body-content">
                <ActionToolbar />
                <div className="horizontal-line" />
                <div className="data-content">
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : errorMessage ? (
                        <p className="error-message">{errorMessage}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" /></th>
                                    <th>ID sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Hình ảnh</th>
                                    <th>Giá</th>
                                    <th>Số lượng tồn</th>
                                    <th>Thời gian sửa đổi</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {snacks.map(snack => (
                                    <tr key={snack._id}>
                                        <td><input type="checkbox" /></td>
                                        <td>{snack.productId}</td>
                                        <td>{snack.name}</td>
                                        <td><img src={`${process.env.REACT_APP_BASE_URL}/${snack.image}`} alt={snack.name} className="snack-image" /></td>
                                        <td>{snack.price}</td>
                                        <td>{snack.quantity}</td>
                                        <td>{new Date(snack.updatedAt).toLocaleString("vi-VN")}</td>
                                        <td>
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => navigate(`/admin/editsnack/${snack._id}`)} 
                                            >
                                                <i className="fas fa-edit" />
                                            </button>
                                            <button className="btn btn-delete" onClick={() => handleDeleteSnack(snack._id)}>
                                                <i className="fas fa-trash" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <Panigation />
            </div>
        </>
    );
};

export default SnackManagement;
