import { useParams, useNavigate } from 'react-router-dom';
import { useEditUser } from '../../hooks/user/useEditUser';
import './accountmanagement.css';

const EditAccount = () => {
    const { userId } = useParams(); 
    console.log("userId từ URL:", userId);
    const {
        fullName, setFullName,
        username, setUserName,
        email, setEmail,
        phone, setPhone,
        role, setRole,
        loading, errorMessage, editUser
    } = useEditUser(userId); 

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật giá trị state tương ứng
        switch (name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'username':
                setUserName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await editUser(); 
        if (success) {
            navigate('/admin/accountmanagement'); 
        }
    };

    if (loading) return <p>Đang tải thông tin người dùng...</p>;
    if (errorMessage) return <p className="error-message">{errorMessage}</p>;

    return (
        <>
            <h2>Sửa nhân viên</h2>
            <form className="add-employee-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="full-name">Họ tên</label>
                    <input
                        type="text"
                        id="full-name"
                        name="fullName"
                        placeholder="Nhập họ tên"
                        value={fullName} 
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Tên tài khoản</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nhập tên tài khoản"
                        value={username || ''} 
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Nhập email"
                        value={email || ''} // Đảm bảo có giá trị mặc định
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        value={phone || ''} // Đảm bảo có giá trị mặc định
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Vai trò</label>
                    <select
                        id="role"
                        name="role"
                        value={role || 'Khách hàng'} // Đảm bảo có giá trị mặc định
                        onChange={handleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="customer">Khách hàng</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-save">Lưu</button>
                    <button type="button" className="btn btn-cancel" onClick={() => navigate('/admin/accountmanagement')}>Hủy</button>
                </div>
            </form>
        </>
    );
};

export default EditAccount;
