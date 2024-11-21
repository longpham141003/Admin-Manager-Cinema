import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./router";
import AdminMain from "../AdminMain";
import AccountManagement from "../pages/Account Management/AccountManagement.js";
import MovieManagement from "../pages/Movie Management/MovieManagement.js";
import CinemaManagement from "../pages/Cinema Management/CinemaManagement.js";
import TicketManagement from "../pages/Ticket Management/TicketManagement.js";
import PaymentManagement from "../pages/Payment Management/PaymentManagement.js";
import ShowtimeManagementByMovie from "../pages/Showtime Management By Movie/ShowtimeManagementByMovie.js";
import ShowtimeManagementByTheater from "../pages/Showtime Management By Movie/ShowtimeManagementByTheater.js";
import SnackManagement from "../pages/Snack Management/SnackManagement.js";
import Dashboard from "../pages/Dashboard/Dashboard.js";
import EditAccount from "../pages/Account Management/EditAccount.js";
import AddAccount from "../pages/Account Management/AddAccount.js";
import AddCinema from "../pages/Cinema Management/AddCinema.js";
import EditCinema from "../pages/Cinema Management/EditCinema.js";
import AddMovie from "../pages/Movie Management/AddMovie.js";
import EditMovie from "../pages/Movie Management/EditMovie.js";
import ProtectedRoute from './ProtectedRoute'; 
import AddSnack from "../pages/Snack Management/AddSnack.js";
import EditSnack from "../pages/Snack Management/EditSnack.js";
import MovieDetail from "../pages/Movie Management/MovieDetail.js";


const AdminRoutes = () => {
  const Routers = [
    { path: ROUTERS.ADMIN.ACCOUNTMANAGEMENT, Component: AccountManagement, title: "Danh sách tài khoản" },
    { path: ROUTERS.ADMIN.MOVIEMANAGEMENT, Component: MovieManagement, title: "Danh sách phim" },
    { path: ROUTERS.ADMIN.CINEMAMANAGEMENT, Component: CinemaManagement, title: "Danh sách rạp" },
    { path: ROUTERS.ADMIN.TICKETMANAGEMENT, Component: TicketManagement, title: "Danh sách vé" },
    { path: ROUTERS.ADMIN.PAYMENTMANAGEMENT, Component: PaymentManagement, title: "Danh sách giao dịch" },
    { path: ROUTERS.ADMIN.SHOWTIMEMANAGEMENTBYMOVIE, Component: ShowtimeManagementByMovie, title: "Lịch chiếu theo phim" },
    { path: ROUTERS.ADMIN.SHOWTIMEMANAGEMENTBYTHEATER, Component: ShowtimeManagementByTheater, title: "Lịch chiếu theo rạp" },
    { path: ROUTERS.ADMIN.SNACKMANAGEMENT, Component: SnackManagement, title: "Danh sách Snack & Nước" },
    { path: ROUTERS.ADMIN.DASHBOARD, Component: Dashboard, title: "Bảng điều khuyển" },
    { path: ROUTERS.ADMIN.EDITACCOUNT, Component: EditAccount, title: "Sửa tài khoản" },
    { path: ROUTERS.ADMIN.ADDACCOUNT, Component: AddAccount, title: "Thêm tài khoản" },
    { path: ROUTERS.ADMIN.EDITCINEMA, Component: EditCinema, title: "Sửa rạp" },
    { path: ROUTERS.ADMIN.ADDCINEMA, Component: AddCinema, title: "Thêm rạp" },
    { path: ROUTERS.ADMIN.ADDMOVIE, Component: AddMovie, title: "Thêm phim" },
    { path: ROUTERS.ADMIN.EDITMOVIE, Component: EditMovie, title: "Sửa phim" },
    { path: ROUTERS.ADMIN.ADDSNACK, Component: AddSnack, title: "Thêm combo" },
    { path: ROUTERS.ADMIN.EDITSNACK, Component: EditSnack, title: "Thêm combo" },
    { path: ROUTERS.ADMIN.MOVIEDETAIL, Component: MovieDetail, title: "Chi tiết phim" },
  ];

  return (
    <Routes>
      {Routers.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={
            <ProtectedRoute>
              <AdminMain title={item.title}>
                <item.Component />
              </AdminMain>
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default AdminRoutes;
