import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MyApp from "./MyApp";
import "./index.css";
function App() {
  return (
    <Router>
      <MyApp />
    </Router>
  );
}

export default App;
