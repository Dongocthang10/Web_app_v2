import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ftp_server from "./pages/ftp-server";
import Error from "./pages/error";
import Dashboard from "./pages/dashboard";
import AutoReport from "./pages/auto-report";
import Connection from "./pages/connection";
import Database from "./pages/database";
import Device from "./pages/device";
import Display from "./pages/display";
import Management from "./pages/management";
import Others from "./pages/others";
import Relay from "./pages/relay";
import Sensor from "./pages/sensor";
import System from "./pages/system";
import LoginForm from "./pages/login";
import './i18n/i18n'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/ftp-server" element={<Ftp_server />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/relay" element={<Relay />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/device" element={<Device />} />
        <Route path="/display" element={<Display />} />
        <Route path="/management" element={<Management />} />
        <Route path="/others" element={<Others />} />
        <Route path="/sensor" element={<Sensor />} />
        <Route path="/system" element={<System />} />
        <Route path="/database" element={<Database />} />
        <Route path="/auto-report" element={<AutoReport />} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default App;
