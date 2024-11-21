import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/Admin Login/AdminLogin";


function AuthRoutes() {
    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
    );
}

export default AuthRoutes;
