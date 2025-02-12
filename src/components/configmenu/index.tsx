import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import DownloadIcon from "@mui/icons-material/Download";

const configItems = [
  "General Information",
  "Sum Config",
  "Sampling Frequency",
  "Modbus TCP/IP",
  "Modbus RTU",
  "Evo-Sens",
  "Virtual Config",
  "Calibration",
  "Alarm",
  "Simulation",
  "Error",
  "Limitation",
  "State Reading",
  "State Control",
  "Output Config",
];

const ConfigMenu: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Config
        </Typography>
        <List>
          {configItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <IconButton color="primary">
            <CheckIcon />
          </IconButton>
          <IconButton color="primary" sx={{ marginLeft: 1 }}>
            <DownloadIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigMenu;
