import React from 'react';
import "./cinemamanagement.css";
import Button from "../../components/button";
import { useNavigate } from 'react-router-dom';
import { useAddTheater } from '../../hooks/theater/useAddTheater';


const AddCinema = () => {
    const navigate = useNavigate();
    const {
        name,setName,
        location, setLocation, 
        totalRooms, setTotalRooms,
        openingHours, setOpeningHours,
        addTheater,
    } = useAddTheater();    

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const success = await addTheater(); 

        if (success) {
            navigate('/admin/cinemamanagement'); 
        }
    } 
    return (
        <>
            <Button label="Tạo rạp mới" />
            <div className="body-content">
                <div className="data-content">
                    <h2>Thêm Rạp Phim</h2>
                    <form className="add-cinema-form" onSubmit={handleSubmit}>
                        {/* Hàng đầu tiên với Địa chỉ và Tổng số phòng */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="address">Tên rạp</label>
                                <input type="text" id="cinema-name" placeholder="Nhập tên rạp" value={name} onChange={(e) => setName(e.target.value)} /> 
                            </div>

                            <div className="form-group">
                                <label htmlFor="total-rooms">Tổng phòng</label>
                                <input type="number" id="total-rooms" placeholder="Nhập tổng số phòng" value={totalRooms} onChange={(e) => setTotalRooms(e.target.value) } />
                            </div>
                        </div>

                        {/* Hàng thứ hai với Tên rạp */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cinema-name">Địa chỉ</label>
                                <input type="text" id="address" placeholder="Nhập địa chỉ" value={location} onChange={(e) => setLocation(e.target.value) }/>
                            </div>
                        </div>

                        {/* Hàng cuối với Giờ mở cửa */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="opening-hours">Giờ mở cửa</label>
                                <input type="text" id="opening-hours" placeholder="Nhập giờ mở cửa" value={openingHours} onChange={(e) => setOpeningHours(e.target.value) } />
                            </div>
                        </div>

                        {/* Nút Lưu và Hủy */}
                        <div className="form-actions">
                            <button type="submit" className="btn btn-save">Lưu</button>
                            <button type="button" className="btn btn-cancel" onClick={() => navigate('/admin/cinemamanagement')}>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCinema;
