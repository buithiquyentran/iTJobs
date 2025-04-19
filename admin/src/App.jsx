import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./index.css";
import Navbar from "~/Components/Navbar";
import { Box } from "@mui/material";
import Sidebar from "./Components/Sidebar";
import { privateRoutes } from "~/routes";
import authService from "./services/auth.service";

const ProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authService.getUserInfo();
        const ROLE = response.MA_ROLE;
        if (ROLE === 1) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
    };
    fetchData();
  }, []);

  if (isAuthorized === null) return <div>Loading...</div>;
  if (isAuthorized === false)
    window.location.href = "http://localhost:5173/auth-page";
  return <Outlet />;
};

function App() {
  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Sidebar />
        <div className="page">
          <Routes>
            <Route element={<ProtectedRoute />}>
              {privateRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={Page ? <Page /> : <div>Không tìm thấy trang</div>}
                  />
                );
              })}
            </Route>
          </Routes>
        </div>
      </Box>
    </div>
  );
}

export default App;
