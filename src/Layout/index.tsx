import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import LoginForm from "../pages/login";
import Sensor from "../pages/sensor";
import Relay from "../pages/relay";
import Ftp_server from "../pages/ftp-server";
import Connection from "../pages/connection";
import Device from "../pages/device";
import System from "../pages/system";
import Display from "../pages/display";
import Others from "../pages/others";
import Database from "../pages/database";
import Management from "../pages/management";
import Input from "../pages/input";
import Dashboard from "../pages/dashboard";
const Layout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Content for the current route will be rendered here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout