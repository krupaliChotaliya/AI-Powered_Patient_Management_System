import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [role, setRole] = useState(sessionStorage.getItem("role"));

  useEffect(() => {
    const handleRoleChange = () => {
      setRole(sessionStorage.getItem("role"));
    };

    window.addEventListener("userRoleChanged", handleRoleChange);

    return () => {
      window.removeEventListener("userRoleChanged", handleRoleChange);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">AI-PMS</h1>
        <div>
          <Link to="/" className="text-white mx-4">Home</Link>

          {role === "doctor" && (
            <Link to="/medical_form" className="text-white mx-4">Medical Form</Link>
          )}

          <Link to="/patient-history" className="text-white mx-4">Patient History</Link>
          <Link to="/doctor-search" className="text-white mx-4">Doctor Search</Link>
          <Link to="/ai-diagnosis" className="text-white mx-4">AI Diagnosis</Link>
          <Link to="/auth" className="text-white mx-4">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
