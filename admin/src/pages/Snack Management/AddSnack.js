import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddSnack } from '../../hooks/snack/useAddSnack';  // Import hook đã tạo
import "./snackmanagement.css";
import Button from '../../components/button';  // Nếu có component Button

const AddSnack = () => {
    const navigate = useNavigate();
    const {
        name,
        setName,
        image,
        setImage,
        price,
        setPrice,
        quantity,
        setQuantity,
        addSnack,
    } = useAddSnack();  

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await addSnack();  // Gọi hàm thêm snack

        if (success) {
            navigate('/admin/snackmanagement');  // Điều hướng đến trang quản lý snack sau khi thêm thành công
        }
    };

    return (
        <div className="body-content">
            <div className="data-content">
                <h2>Thêm Snack</h2>
                <form className="add-snack-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tên snack</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Nhập tên snack" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Hình ảnh</label>
                        <input 
                            type="file" 
                            id="image" 
                            onChange={(e) => setImage(e.target.files[0])} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Giá</label>
                        <input 
                            type="number" 
                            id="price" 
                            placeholder="Nhập giá" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Số lượng</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            placeholder="Nhập số lượng" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-save">Lưu</button>
                        <button 
                            type="button" 
                            className="btn btn-cancel" 
                            onClick={() => navigate('/admin/snackmanagement')}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSnack;
