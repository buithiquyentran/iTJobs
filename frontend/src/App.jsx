import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrimarySearchAppBar from "~/Components/PrimarySearchAppBar/PrimarySearchAppBar";
import { SearchJob, SearchBlog, SearchCompany } from "~/Components/Search";
import Footer from "~/Components/Footer/Footer";
import { publicRoutes } from "~/routes";
export default function MyAppBar() {
  return (
    <Router>
      <PrimarySearchAppBar position="static" />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          console.log(route.path);
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
      <Footer />
    </Router>
  );
}
