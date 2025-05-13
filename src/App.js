import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./screens/sidebar";
import Courses from "./screens/courses";
import { Auth } from "./backend/auth";
import "./CSS/fonts.css";
import "./CSS/props.css";
import Learning from "./screens/learnings.js";

function MainApp() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="App flex">
      <Sidebar />
 
      <Courses />
      <button onClick={handleLogout} style={{ position: "fixed", top: "20px", right: "20px", backgroundColor: "red", color: "white", border: "none", padding: "10px", borderRadius: "5px" }}>
        Logout
      </button>
    </div>
  );
}

function App() {
  const isLoggedIn = localStorage.getItem("userEmail") !== null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <Auth />} />
        <Route path="/main" element={isLoggedIn ? <MainApp /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
