import React, { useState } from "react";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const SensorConfig: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [dialogOpen, setDialogOpen] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    sensorName: "CO2",
    id: "1",
    groupName: "Giếng 1",
    groupNumber: "1",
    unit: "ppm",
    displayValue: "Calib Value",
    protocol: "Modbus RTU",
    note: "Cảm biến này được dùng để đo lường các thông số mực nước và đang được bảo trì",
    logDataType: "Modbus RTU",
    logName: "MUCNUOC",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDialog = (field: string) => {
    setDialogOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fields = [
    { label: "Tên cảm biến", name: "sensorName", tooltip: "Tên của cảm biến đo" },
    { label: "ID", name: "id", tooltip: "Mã định danh của cảm biến" },
    { label: "Group Name", name: "groupName", tooltip: "Tên nhóm cảm biến" },
    { label: "Group Number", name: "groupNumber", tooltip: "Số nhóm cảm biến" },
    { label: "Đơn vị", name: "unit", tooltip: "Đơn vị đo lường" },
    { label: "Giá trị hiển thị", name: "displayValue", tooltip: "Giá trị hiển thị trên màn hình" },
    { label: "Protocol", name: "protocol", tooltip: "Giao thức kết nối" },
    { label: "Ghi chú", name: "note", type: "textarea", tooltip: "Ghi chú thêm về cảm biến" },
  ];
  
  const FTP_fields = [
    { label: "Log Data Type", name: "logDataType", tooltip: "Loại dữ liệu log" },
    { label: "Log Name", name: "logName", tooltip: "Tên file log" },
  ]

  return (
    <div className="w-1/3 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span>1. {formData.sensorName}</span>
        <span>General</span>
      </h2>
      <div className="flex items-center gap-3 mt-4">
      <span className="text-sm font-medium mr-20">Kích Hoạt</span>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0">
            </div>
        </label>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex items-center gap-2">
            <label className="w-1/3 text-sm font-semibold flex items-center">
              {field.label}
              <Tooltip title="Chú thích">
                <IconButton size="small" color="inherit" onClick={() => toggleDialog(field.name)}>
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </label>
            {field.type === "textarea" ? (
              <textarea name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleChange} className="w-2/3 p-2 border rounded" />
            ) : (
              <input type={field.type || "text"} name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleChange} className="w-2/3 p-2 border rounded" />
            )}
            <Dialog open={!!dialogOpen[field.name]} onClose={() => toggleDialog(field.name)}>
              <DialogTitle>Thông tin {field.label}</DialogTitle>
              <DialogContent>{field.tooltip}</DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      <h5>FTP Log</h5>  
      <div className="mt-4 flex flex-col gap-4">
        {FTP_fields.map((field) => (
          <div key={field.name} className="flex items-center gap-2">
            <label className="w-1/3 text-sm font-semibold flex items-center">
              {field.label}
              <Tooltip title="Chú thích">
                <IconButton size="small" color="inherit" onClick={() => toggleDialog(field.name)}>
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </label>
              <input name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleChange} className="w-2/3 p-2 border rounded" />
            <Dialog open={!!dialogOpen[field.name]} onClose={() => toggleDialog(field.name)}>
              <DialogTitle>Thông tin {field.label}</DialogTitle>
              <DialogContent>{field.tooltip}</DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorConfig;
