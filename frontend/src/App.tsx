import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUser from "./pages/AboutUser";
import NoMatchPage from "./pages/NoMatchPage";
import NavBar from "./components/NavBar";
import Header from "./components/Header";

import UCProvider from "./UCProvider";
function App() {
  return (
    <UCProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid">
          <br />
          <br />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutuser" element={<AboutUser />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UCProvider>
  );
}

export default App;
