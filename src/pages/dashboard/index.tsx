import React, {useState} from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserInfoDialog from '../../components/userdialog';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Sidebar from '../../components/sidebar';
import AppRoutes from '../../AppRoutes';
import ConfigMenu from '../../components/configmenu';
import { SensorChart } from '../../components/linechart';
import SensorConfig from '../../components/sensorconfig';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Sidebar></Sidebar>
      {/* <AppRoutes></AppRoutes> */}
      <Button
        variant="contained"
        onClick={() => setDialogOpen(true)}
        style={{
            position: 'fixed',
            right: 30,
            top: 20,
            zIndex: 1100,
            backgroundColor: "#000",
            color: "#fff",
          }}
        startIcon={<SupervisorAccountIcon />} // Add the admin icon
      >
        Admin
      </Button>
      <div style={{ marginLeft: 240, padding: 20 }}>
        <UserInfoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      </div>
      <div className="container">
      <div style={{ display: "flex", justifyContent:"flex-end", alignItems: "flex-start",  paddingRight: "50px", paddingBottom: "200px" }}>
      {/* <ConfigMenu></ConfigMenu>
      <SensorChart /> */}
      <SensorConfig/>
      </div>
      </div>
    </div>

  );
};

export default Dashboard;