import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, Button, Stack  } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Language } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Define the interface for sidebar menu items
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

// Define the interface for the Sidebar component props
interface SidebarProps {
  onItemClick?: (itemId: string) => void;
  defaultLanguage?: 'vi' | 'en';
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onItemClick,
  defaultLanguage = 'vi'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [language, setLanguage] = useState<'vi' | 'en'>(defaultLanguage);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const languages: { code: "vi" | "en"; label: string }[] = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
  ];

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [open, setOpen] = useState(false);

  // Handle menu item click
  const handleItemClick = (itemId: string, path: string) => {
    setActiveItem(itemId);
    if (navigate) {
      navigate(path);
    }
    if (onItemClick) {
      onItemClick(itemId);
    }
    // Don't close the sidebar when clicking menu items
  };

  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = language === 'vi' ? 'en' : 'vi';
    setLanguage(newLanguage);
    if (i18n) {
      i18n.changeLanguage(newLanguage);
    }
  };

  // Sidebar menu items
  const menuItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      id: 'sensor',
      label: 'Sensor',
      path: '/sensor',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'relay',
      label: 'Relay',
      path: '/relay',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 7H7v6h6V7z" />
          <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'input',
      label: 'Input',
      path: '/input',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'ftp-server',
      label: 'FTP Server',
      path: '/ftp-server',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'database',
      label: 'Database',
      path: '/database',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
          <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
          <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
        </svg>
      ),
    },
    {
      id: 'device',
      label: 'Device',
      path: '/device',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'alarm',
      label: 'Alarm',
      path: '/alarm',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      id: 'other-software',
      label: 'Other Software',
      path: '/other-software',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'system',
      label: 'System',
      path: '/system',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'display',
      label: 'Display',
      path: '/display',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'connection',
      label: 'Connection',
      path: '/connection',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  // Sidebar content component
  const SidebarContent = () => (
  <div className="flex flex-col h-full bg-white rounded-3xl shadow-lg w-[130px] min-w-[100px] max-w-[300px] py-4 relative border border-gray-100">

      <div className="flex justify-center items-center mb-6 px-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-600">MT</div>
          <div className="text-xs text-teal-600">Technology</div>
        </div>
      </div>

      {/* Blue border line */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-black-500 rounded-l-2xl"></div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col space-y-1.5 px-1.5 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id, item.path)}
            className={`flex items-center justify-start px-2 py-1 rounded-full text-[10px] h-auto min-h-[28px] ${
              activeItem === item.id
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors duration-200 w-full`}
          >
            <span className="mr-2">{item.icon}</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Language Switcher */}
      <div className="mt-2 px-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5, // Giảm khoảng cách giữa icon và chữ
          backgroundColor: "#444",
          color: "white",
          borderRadius: "15px", // Bo góc nhỏ lại
          paddingX: 1.5, // Giảm padding ngang
          paddingY: 0.5, // Giảm padding dọc
          fontSize: "0.75rem", // Nhỏ hơn mặc định
          minHeight: "30px", // Đảm bảo button không quá to
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        ★ {language === "vi" ? "Tiếng Việt" : "English"}
      </Button>

      {/* Dialog chứa SelectBox */}
      <Dialog 
      open={open} 
      onClose={() => setOpen(false)} 
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: 24,
          left: 24, 
          margin: 0,
        },
      }}>
  <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
    Chọn ngôn ngữ
  </DialogTitle>
  <DialogContent>
    <Stack spacing={1}>
      {languages.map((item) => (
        <Button
          key={item.code}
          onClick={() => {
            setLanguage(item.code); 
            if (i18n) {
              i18n.changeLanguage(item.code);
            }
            setOpen(false);
          }}
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "#222",
            color: "white",
            borderRadius: "25px",
            paddingY: 1.5,
            textTransform: "none",
            "&:hover": { backgroundColor: "#333" },
          }}
          startIcon={<LanguageIcon />}
          fullWidth
        >
          {item.label}
        </Button>
      ))}
    </Stack>
  </DialogContent>
</Dialog>

          <button className="text-gray-500 rounded-full p-1 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <Button
      onClick={toggleSidebar}
      variant="contained"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1, // Khoảng cách giữa icon và chữ
        backgroundColor: "#444",
        color: "white",
        borderRadius: "25px",
        paddingX: 2,
        paddingY: 1,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#333",
        },
      }}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
      Menu
    </Button>

      {/* Sidebar - shown or hidden based on isOpen state */}
      <div className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
