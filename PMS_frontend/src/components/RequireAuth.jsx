import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    console.log("Token inside RequireAuth:", token);
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  return children;
};

export default RequireAuth;
