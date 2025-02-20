import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

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
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
}

const SumConfig = () => {
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
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent>
          <div className="mb-6">
            <Typography variant="h6" className="mb-4">
              1. CO2
              <span className="float-right">Sum</span>
            </Typography>
          </div>

          {/* Kích Hoạt */}
          <div className="flex items-center justify-between mb-4">
            <Typography className="w-32">Kích Hoạt</Typography>
            <div className="flex-1">
              <Switch
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
              />
            </div>
          </div>

          {/* Phương pháp tính */}
          <div className="flex items-center mb-4">
            <Typography className="w-32">Phương pháp tính</Typography>
            <FormControl fullWidth>
              <Select
                value={formData.method}
                size="small"
                onChange={(e) => handleChange('method', e.target.value)}
              >
                <MenuItem value="End Point">End Point</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Đơn vị */}
          <div className="flex items-center mb-4">
            <Typography className="w-32">Đơn vị</Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="flex items-center mb-4">
            <Typography className="w-32">Type</Typography>
            <FormControl fullWidth>
              <Select
                value={formData.type}
                size="small"
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <MenuItem value="Day Sum Value">Day Sum Value</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Sum Index */}
          <div className="flex items-center mb-4">
            <Typography className="w-32">Sum Index</Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.sumIndex}
              onChange={(e) => handleChange('sumIndex', e.target.value)}
            />
          </div>

          {/* Reset Date Time */}
          <div className="flex items-start mb-4">
            <Typography className="w-32 mt-2">Reset Date Time</Typography>
            <div className="flex-1 space-y-3">
              {Object.entries(formData.resetDateTime).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <Typography className="w-16 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={value}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: '4px',
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
          <div className="flex items-start mb-4">
            <Typography className="w-32">Tính năng giới hạn</Typography>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <Typography>Kích hoạt</Typography>
                <Switch
                  checked={formData.limitTime.isActive}
                  onChange={(e) => handleLimitTimeChange('isActive', e.target.checked)}
                />
              </div>
              {Object.entries(formData.limitTime)
                .filter(([key]) => key !== 'isActive')
                .map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4">
                    <Typography className="w-16 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={value}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: '4px',
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SumConfig;