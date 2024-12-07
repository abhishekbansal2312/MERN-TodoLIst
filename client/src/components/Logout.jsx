import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  // Accept setIsAuthenticated as a prop
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "GET",
        credentials: "include", // Include credentials for cookies/session handling
      });

      if (response.ok) {
        // Remove token from localStorage if it exists
        localStorage.removeItem("authtoken");
        setIsAuthenticated(false); // Update the authentication state
        navigate("/login"); // Redirect to the login page
        console.log("Logged out successfully");
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:text-white transition-colors">
      Logout
    </button>
  );
};

export default Logout;
