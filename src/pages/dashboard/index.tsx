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
import SensorChart from '../../components/linechart';
import SensorConfig from '../../components/sensorconfig';
import SumConfig from '../../components/sumconfig';
import CalibForm from '../../components/calibconfig';
import ColorPicker from '../../components/alarmcolorpicker';
import OutputConfig from '../../components/outputconfig';
import FTPgeneral from '../../components/generalconfigFTP';
import EvoSensor from '../../components/evosensor';
import SensorGeneral from '../../components/sensorgeneral';
import SensorAdvance from '../../components/sensoradvance';
import Switch from '../../components/switch';
import AquasoftPanel from '../../components/aquasoft';
import SamplingComponent from '../../components/sampling';
import StateControlComponent from '../../components/statecontrol';
import Simulation from '../../components/simulation';
// import MonitoringStation from '../../components/tt17';
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
      {/* <ConfigMenu></ConfigMenu> */}
      {/* <SensorChart /> */}
      {/* <SensorConfig/> */}
      {/* <SumConfig></SumConfig>  */}
      {/* <CalibForm></CalibForm> */}
      {/* <ColorPicker></ColorPicker> */}
      {/* <OutputConfig></OutputConfig> */}
      {/* <FTPgeneral></FTPgeneral> */}
      {/* <EvoSensor></EvoSensor> */}
      {/* <SensorGeneral></SensorGeneral>
      <SensorAdvance/> */}
      <AquasoftPanel></AquasoftPanel>
      {/* <SamplingComponent></SamplingComponent> */}
      {/* <StateControlComponent></StateControlComponent> */}
      {/* <Simulation></Simulation> */}
      {/* <MonitoringStation></MonitoringStation> */}
      </div>
      </div>
    </div>

  );
};

export default Dashboard;