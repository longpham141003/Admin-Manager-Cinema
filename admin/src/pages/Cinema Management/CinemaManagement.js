import React from 'react';
import axios from 'axios';
import "./cinemamanagement.css";
import Button from "../../components/button";
import ActionToolbar from '../../components/ActionToolbar';
import Panigation from "../../components/Panigation";
import { useTheater } from '../../hooks/theater/useTheater';
import { useNavigate } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';
import useDeleteTheater from '../../hooks/theater/useDeleteTheater';

const CinemaManagement = () => {
    const { theaters, loading, errorMessage, loadTheaters } = useTheater();
    const navigate = useNavigate();
    const { deleteTheater  } = useDeleteTheater();
    const handleDeleteUser = async (theaterId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (confirmDelete) {
            await deleteTheater(theaterId); // Gọi hàm xóa người dùng
            loadTheaters(); // Tải lại danh sách người dùng sau khi xóa
        }
    };
    return (
        <>
            <NavLink to="/admin/addcinema">
                <Button label="Tạo rạp mới" />
            </NavLink>
            <div className="body-content"> {/* Wrapper này */}
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
                                <th>
                                </th>
                                <th>Mã rạp</th>
                                <th>Tên rạp</th>
                                <th>Địa chỉ</th>
                                <th>Tổng phòng</th>
                                <th>Giờ mở cửa</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {theaters.map(theater => (
                            <tr key={theater._id}>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <td>R001</td>
                                <td>{theater.name}</td>
                                <td>{theater.location}</td>
                                <td>{theater.totalRooms}</td>
                                <td>{theater.openingHours}</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => navigate(`/admin/editcinema/${theater._id}`)}>
                                        <i className="fas fa-edit" />
                                    </button>
                                    
                                    <button className="btn btn-delete" onClick={() => handleDeleteUser(theater._id)}>
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

export default CinemaManagement;
