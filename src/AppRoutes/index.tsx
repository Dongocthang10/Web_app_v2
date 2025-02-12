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
import Layout from "../Layout";


export const AppRoutes:React.FC = () => {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sensor" element={<Sensor />} />
        <Route path="/relay" element={<Relay />} />
        <Route path="/input" element={<Input />} />
        <Route path="/management" element={<Management />} />
        <Route path="/device" element={<Device />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/ftp-server" element={<Ftp_server />} />
        <Route path="/database" element={<Database />} />
        <Route path="/system" element={<System />} />
        <Route path="/display" element={<Display />} />
        <Route path="/others" element={<Others />} />
        <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Redirect for unmatched routes */}
      </Route>

      {/* Non-layout routes */}
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default AppRoutes;
