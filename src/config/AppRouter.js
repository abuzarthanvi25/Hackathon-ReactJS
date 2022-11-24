import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import ProfilePage from "../screens/ProfilePage";
import SignUp from "../screens/SignUp";
import UserMain from "../screens/UserMain";
import VerifyBooking from "../screens/VerifyBooking";
function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="userMain" element={<UserMain />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verifyBooking" element={<VerifyBooking />} />
          <Route path="profilepage" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
