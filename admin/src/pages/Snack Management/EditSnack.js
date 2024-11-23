import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditSnack } from '../../hooks/snack/useEditSnack'; 
import './snackmanagement.css'; 

const EditSnack = () => {
    const { snackId } = useParams(); 
    console.log("Snack ID từ URL:", snackId);

    // Sử dụng hook để lấy dữ liệu snack
    const {
        name, setName,
        image, setImage,
        price, setPrice,
        quantity, setQuantity,
        loading, errorMessage, editSnack
    } = useEditSnack(snackId);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật giá trị state tương ứng
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'quantity':
                setQuantity(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await editSnack();
         console.log("Kết quả chỉnh sửa snack:", success);
        if (success) {
            alert("Cập nhật snack thành công!");
            navigate('/admin/snackmanagement'); 
        } else {
            alert("Cập nhật snack thất bại!");
        }
    };

    if (loading) return <p>Đang tải thông tin snack...</p>;
    if (errorMessage) return <p className="error-message">{errorMessage}</p>;

    return (
        <div className="main-content">
            <h2 className="title">Chỉnh sửa Snack</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Tên sản phẩm:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nhập tên sản phẩm"
                                value={name || ''} // Đảm bảo có giá trị mặc định
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Giá:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Nhập giá sản phẩm"
                                value={price || ''} // Đảm bảo có giá trị mặc định
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Số lượng:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                placeholder="Nhập số lượng"
                                value={quantity || ''} // Đảm bảo có giá trị mặc định
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Hình ảnh:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}  // Lưu file ảnh
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-save">Cập nhật</button>
                        <button type="button" className="btn btn-cancel" onClick={() => navigate('/admin/snackmanagement')}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSnack;
