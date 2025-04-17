import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import PatientHistory from "./pages/PatientHistory";
import DoctorSearch from "./pages/DoctorSearch";
import Home from "./pages/Home";
import AIDiagnosis from "./pages/AIDiagnosis";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Auth from "./pages/Auth";
import MedicalForm from "./pages/MedicalForm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/patient-history"
          element={
            <RequireAuth>
              <PatientHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/doctor-search"
          element={
            <RequireAuth>
              <DoctorSearch />
            </RequireAuth>
          }
        />
        {/* <Route path="/appointment-scheduler" element={
            <AppointmentScheduler
            />} /> */}
        <Route
          path="/ai-diagnosis"
          element={
            <RequireAuth>
              <AIDiagnosis />
            </RequireAuth>
          }
        />
        <Route
          path="/medical_form"
          element={
            <RequireAuth>
              <MedicalForm />
            </RequireAuth>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
