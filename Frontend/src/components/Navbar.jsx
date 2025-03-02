import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return navigate("/");
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/check-auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data.user);
      } catch (error) {
        console.log("Error", error);
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/dash">
          <i className="fas fa-mortar-pestle text-primary me-2"></i>
          <span className="fw-bold text-primary">MediCare Shop</span>
        </Link>

        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2"
            onClick={() => navigate("/medicinelist")}
          >
            <i className="fas fa-pills"></i>
            <span>Medicine Details</span>
          </button>

          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2"
            onClick={() => navigate("/purchase")}
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Purchase Details</span>
          </button>
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2"
            onClick={() => navigate("/saleslist")}
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Sales </span>
          </button>
        </div>


        <div className="d-lg-flex align-items-center ms-auto">
          <div className="dropdown ms-lg-2 mt-2 mt-lg-0">
            <button
              className="btn btn-outline-secondary dropdown-toggle w-100 w-lg-auto"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-user-circle me-2"></i>
              {userData.name}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
