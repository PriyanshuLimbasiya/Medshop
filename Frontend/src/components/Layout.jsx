import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="bg-light min-vh-100 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
