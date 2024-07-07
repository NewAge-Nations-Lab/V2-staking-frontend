import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import ContactUs from "./pages/ContactUs";
import Usecase from './pages/Usecase';
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import VerificationForm from "./components/VerificationForm";
import EmailVerificationSuccess from "./components/EmailVerificationSuccess";
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import ReferralList from "./pages/ReferralList";
import Nav from "./components/Nav";
import RequireAuth from "./components/RequireAuth";
import AdminPage from "./pages/AdminPage";
import RequireAdmin from "./components/RequireAdmin";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <RequireAuth loginPath="/login">
              <Dashboard />
            </RequireAuth>
          } 
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verification" element={<VerificationForm />} />
        <Route path="/verificationSuccess" element={<EmailVerificationSuccess />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/use-case" element={<Usecase />} />
        <Route 
          path="/admin" 
          element={
            <RequireAuth loginPath="/login">
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>
            </RequireAuth>
          } 
        />
        <Route 
          path="/referral-list" 
          element={
            <RequireAuth loginPath="/login">
              <ReferralList />
            </RequireAuth>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
