import React from 'react';
import "./cinemamanagement.css"; 
import Button from "../../components/button";
import { useEditTheater } from '../../hooks/theater/useEditTheater';
import { useParams, useNavigate } from 'react-router-dom';

const EditCinema = () => {
    const { theaterId } = useParams();
    console.log("theaterId từ URL:", theaterId);
    const { name, setName, location, setLocation, totalRooms, setTotalRooms, openingHours, setOpeningHours, loading, errorMessage, editTheater } = useEditTheater(theaterId); 

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật giá trị state tương ứng
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'totalRooms':
                setTotalRooms(value);
                break;
            case 'openingHours':
                setOpeningHours(value);
                break;
            default:
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await editTheater();
        if (success) {
            navigate('/admin/cinemamanagement'); 
        }
    };
    if (loading) return <p>Đang tải thông tin rạp...</p>;
    if (errorMessage) return <p className="error-message">{errorMessage}</p>;
    return (
        <>
            <h2>Sửa thông tin Rạp</h2>
            <form className="add-cinema-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên rạp</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập tên rạp"
                        value={name} 
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Địa chỉ</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Nhập địa chỉ"
                        value={location || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="totalRooms">Tổng phòng</label>
                    <input
                        type="number"
                        id="totalRooms"
                        name="totalRooms"
                        placeholder="Nhập tổng số phòng"
                        value={totalRooms} 
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="openingHours">Giờ mở cửa</label>
                    <input
                        type="text"
                        id="openingHours"
                        name="openingHours"
                        placeholder="Nhập giờ mở cửa"
                        value={openingHours}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-save">Lưu thay đổi</button>
                    <button type="button" className="btn btn-cancel" onClick={() => navigate('/admin/cinemamanagement')}>
                        Hủy
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditCinema;
