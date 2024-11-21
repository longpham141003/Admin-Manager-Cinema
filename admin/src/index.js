import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { SnackProvider } from "./contexts/SnackContext";
import { StatusProvider } from "./contexts/StatusContext";
import { TheaterProvider } from "./contexts/TheaterContext";
import { MovieProvider } from "./contexts/MovieContext";
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <BrowserRouter>
            <AuthProvider>
                <StatusProvider>
                    <UserProvider> 
                    <TheaterProvider>
                    <MovieProvider>
                    <SnackProvider>
                        <AdminRoutes />
                        <AuthRoutes />
                    </SnackProvider>    
                    </MovieProvider>
                    </TheaterProvider>
                    </UserProvider>   
                </StatusProvider> 
            </AuthProvider>    
        </BrowserRouter>
    );
}
