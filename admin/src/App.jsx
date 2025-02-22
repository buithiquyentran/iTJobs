import { Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "~/Components/Navbar";
import { Box } from "@mui/material";
import Sidebar from "./Components/Sidebar";
import { publicRoutes } from "~/routes";

function App() {
  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Sidebar />
        <div className="page">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={Page ? <Page /> : <div>Không tìm thấy trang</div>}
                />
              );
            })}
          </Routes>
        </div>
      </Box>
    </div>
  );
}

export default App;
