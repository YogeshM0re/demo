// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Componant/Login/Login";
import Register from "./Componant/Register/Register";
import Feeds from "./Componant/Feed/Feeds";
import Header from "./Componant/Header/Header";
import Footer from "./Componant/Footer/Footer";
import ViewPosts from "./Componant/View Post/ViewPost";
import AdminDashboard from "./Componant/Admin/Admin";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/viewposts" element={<ViewPosts />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
