import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import HomePage from "../pages/Home/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import HistoryPage from "../pages/History/HistoryPage";
import PaymentPage from "../pages/Payment/PaymentPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import AdminApprovalPage from "../pages/Admin/AdminApprovalPage";

export default function AppRoutes() {
  const { user } = useAuth();

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <LandingPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                {user?.role === "admin" ? <AdminHomePage /> : <HomePage />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/approvals"
            element={
              <ProtectedRoute>
                {user?.role === "admin" ? (
                  <AdminApprovalPage />
                ) : (
                  <Navigate to="/home" />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
