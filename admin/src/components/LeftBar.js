import React from "react";
import { NavLink } from "react-router-dom";

const LeftBar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <div className="left-bar">
      <div className="user-info">
        <img src="https://via.placeholder.com/80" alt="User Avatar" />
        <h4>{userInfo ? userInfo.hoTen : 'Phạm Quang Long'}</h4> {/* Hiển thị tên người dùng */}
        <p>Chào mừng bạn trở lại</p>
      </div>
      <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-tachometer-alt"></i> Bảng điều khiển
      </NavLink>
      <NavLink to="/admin/moviemanagement" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-film"></i> Quản lý phim
      </NavLink>
      <NavLink to="/admin/cinemamanagement" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-theater-masks"></i> Quản lý rạp
      </NavLink>
      <NavLink to="/admin/ticketmanagement" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-ticket-alt"></i> Quản lý vé
      </NavLink>
      <NavLink to="/admin/paymentmanagement" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-exchange-alt"></i> Quản lý giao dịch
      </NavLink>
      <NavLink to="/admin/showtimemanagementbymovie" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-clock"></i> Lịch chiếu theo phim
      </NavLink>
      <NavLink to="/admin/showtimemanagementbytheater" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-calendar-alt"></i> Lịch chiếu theo rạp
      </NavLink>
      <NavLink to="/admin/snackmanagement" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-utensils"></i> Quản lý snack và nước
      </NavLink>
      <NavLink to="/admin/accountmanagement" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <i className="fas fa-user"></i> Quản lý tài khoản
      </NavLink>
    </div>
  );
};

export default LeftBar;
