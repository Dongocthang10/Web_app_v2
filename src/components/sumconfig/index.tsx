import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import Switch from '../switch';

interface SumConfigData {
  isActive: boolean;
  method: string;
  unit: string;
  type: string;
  sumIndex: string;
  resetDateTime: {
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
  limitTime: {
    isActive: boolean;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
}

const SumConfig = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [formData, setFormData] = useState<SumConfigData>({
    isActive: true,
    method: 'End Point',
    unit: 'm3 / ngày',
    type: 'Day Sum Value',
    sumIndex: '60',
    resetDateTime: {
      month: '1',
      day: '1',
      hour: '1',
      minute: '1',
      second: '1',
    },
    limitTime: {
      isActive: true,
      month: '1',
      day: '1',
      hour: '1',
      minute: '1',
      second: '1',
    },
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetDateTimeChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      resetDateTime: {
        ...prev.resetDateTime,
        [field]: value,
      },
    }));
  };

  const handleLimitTimeChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      limitTime: {
        ...prev.limitTime,
        [field]: value,
      },
    }));
  };

  return (
    <div className="max-w-5xl w-1/2 mx-auto p-7 bg-white rounded-lg shadow-2xl shadow-black/50">
      <div className="flex justify-between items-center pt-0">
        <h2 className="text-3xl font-medium">1. CO2</h2>
        <span className="text-3xl font-medium">Sum</span>
      </div>
      <div className="border-t border-gray-300 border-dashed my-4"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <label className="text-sm font-medium mr-20">Kích hoạt</label>
            <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
          </div>
        </div>

        {/* Phương pháp tính */}
        <div className="space-y-4 w-full">
        {/* Server gần nhất */}
        <div className="flex items-center">
          <span className="text-sm w-32">Phương pháp tính</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value="End point"
              className="w-full p-2 border rounded-lg pr-10 text-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-lg">
              {/* <Download className="w-4 h-4" /> */}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm w-32">Đơn vị</span>
          <input
            type="text"
            value="m3/ngày"
            className="w-full p-2 border rounded-lg text-sm"
          />
        </div>
        <div className="flex items-center">
          <span className="text-sm w-32">Type</span>
          <input
            type="text"
            value="Day Sum Value"
            className="w-full p-2 text-sm border rounded-lg"
          />
        </div>
        <div className="flex items-center">
          <span className="text-sm w-32">Sum Index</span>
          <input
            type="number"
            value="60"
            className="w-full p-2 border rounded-lg text-sm"
          />
        </div>
      </div>


        {/* Reset Date Time */}
        <div className="flex items-center mb-4 space-y-4">
          <span className="text-sm font-semibold w-32">Reset Date Time</span>
          <div className="flex-1 space-x-32 space-y-2">
            {Object.entries(formData.resetDateTime).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <Typography className="w-16 text-xs">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={value}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      height: '30px'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E0E0E0',
                    },
                  }}
                  onChange={(e) => handleResetDateTimeChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tính năng giới hạn */}
        <div className="flex items-center">
          <label className="text-sm font-medium mr-20">Kích hoạt</label>
          <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
        </div>
        <div className="flex items-center mb-4">
        <span className="text-sm font-semibold w-32">Tính năng giới hạn</span>
          <div className="flex-1 space-x-32 space-y-2">
            {Object.entries(formData.limitTime)
              .filter(([key]) => key !== 'isActive')
              .map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Typography className="w-16 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                  <TextField
                    className="w-24"
                    size="small"
                    value={value}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        height: '30px'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E0E0E0',
                      },
                    }}
                    onChange={(e) => handleLimitTimeChange(key, e.target.value)}
                  />
                </div>
              ))}
          </div>
        </div>
    </div>
  );
};

export default SumConfig;