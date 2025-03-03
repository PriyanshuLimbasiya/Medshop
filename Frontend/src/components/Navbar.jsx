import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const { data } = await axios.get(
          "http://localhost:5000/api/auth/check-auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(data.user);
      } catch (error) {
        console.error("Authentication Error:", error);
        alert("Session expired. Please log in again.");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3">
      <div className="container-fluid px-4">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/dash">
          <i className="fas fa-mortar-pestle text-primary me-2 fs-4"></i>
          <span className="fw-bold text-primary fs-5">MediCare Shop</span>
        </Link>

        {/* Navigation Buttons */}
        <div className="d-flex gap-3 ms-auto">
          {[
            { path: "/medicinelist", icon: "fa-pills", label: "Medicines" },
            { path: "/purchase", icon: "fa-shopping-bag", label: "Purchases" },
            { path: "/saleslist", icon: "fa-shopping-cart", label: "Sales" },
          ].map(({ path, icon, label }) => (
            <button
              key={path}
              className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
              onClick={() => navigate(path)}
            >
              <i className={`fas ${icon} fs-6`}></i>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* User Dropdown */}
        <div className="dropdown ms-3">
          <button
            className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
            type="button"
            data-bs-toggle="dropdown"
          >
            <div className="user-avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: "35px", height: "35px" }}>
              {userData ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span>{userData ? userData.name : "User"}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
