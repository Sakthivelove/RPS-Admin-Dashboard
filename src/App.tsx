import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Admin/login";
import ForgotPassword from "./components/Admin/forgotPassword";
import Popup from "./components/Admin/PopUp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/popup" element={<Popup />} />
      </Routes>
    </Router>
  );
}

export default App;
