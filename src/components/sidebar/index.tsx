import React, { useState } from "react";
import { Box, Button, IconButton, Drawer, Typography, MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate,  } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the navbar
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [
    { label: "Sensor", path: "/sensor" },
    { label: "Relay", path: "/relay" },
    { label: "Input", path: "/input" },
    { label: "FTP Server", path: "/ftp-server" },
    { label: "Database", path: "/database" },
    { label: "Error", path: "/error" },
    { label: "Management", path: "/management" },
    { label: "Device", path: "/device" },
    { label: "Auto Report", path: "/auto-report" },
    { label: "System", path: "/system" },
    { label: "Display", path: "/display" },
    { label: "Connection", path: "/connection" },
    { label: "Others", path: "/others" },
  ];

    return (
      <>
        {/* Menu Button */}
        <IconButton
        onClick={() => setIsOpen(true)}
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: "25px",
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "#333333",
          },
        }}
        >
        <MenuIcon />
        </IconButton>

        {/* Navbar as a Drawer */}
        <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{
            width: "300px",
            height: "100vh",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: "10px",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              textAlign: "center",
              padding: "10px 0",
              marginBottom: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <img
              src="https://via.placeholder.com/120x40"
              alt="Logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          {/* Menu Items */}
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="contained"
                fullWidth
                onClick={() => {
                  navigate(item.path); // Navigate to the respective path
                  setIsOpen(false); // Close the drawer
                }}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  justifyContent: "align-center",
                  borderRadius: "25px",
                  marginBottom: "8px",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Language and Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderTop: "1px solid #ccc",
            }}
          >
    <>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "30px",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
            startIcon={<StarIcon />} 
            onClick={handleClick} 
          >
            Tiếng Việt
          </Button>

          {/* Menu for language options */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem  onClick={handleClose}>Tiếng Việt</MenuItem>
            <MenuItem onClick={handleClose}>English</MenuItem>
            <MenuItem onClick={handleClose}>티엔 한</MenuItem>
          </Menu>
        </>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
