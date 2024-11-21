import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderRightBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');

    // Chuyển hướng người dùng về trang đăng nhập
    navigate('/admin/adminlogin');
  };

  return (
    <div className="header-right-bar">
      <a href="#" className="website-link">Vào trang web</a>
      <button className="logout-button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        Đăng xuất
      </button>
    </div>
  );
};

export default HeaderRightBar;
