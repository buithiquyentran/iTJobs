import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import PrimarySearchAppBar from "~/Components/PrimarySearchAppBar/PrimarySearchAppBar";
import { SearchJob, SearchBlog, SearchCompany } from "~/Components/Search";
import Footer from "~/Components/Footer/Footer";
import { publicRoutes } from "~/routes";

function MyApp() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth-page";

  return (
    <>
      {/* Hiển thị AppBar nếu không phải trang login */}
      {!isLoginPage && <PrimarySearchAppBar position="static" />}

      {/* Các route */}
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  {route.path === "/" && <SearchJob />}
                  {route.path === "/company" && <SearchCompany />}
                  {route.path === "/blog" && <SearchBlog />}
                  <Page />
                </>
              }
            />
          );
        })}
      </Routes>

      {/* Footer */}
      {!isLoginPage && <Footer />}
    </>
  );
}

export default MyApp;
