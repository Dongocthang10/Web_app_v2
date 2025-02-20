import React, { useState } from 'react';
import { Checkbox, 
         TextField, 
         Select, 
         MenuItem, 
         FormControl, 
         InputLabel, 
         Typography, 
         Card, 
         CardContent, 
         FormGroup,
         FormControlLabel,
         Grid, 
         Box,
         IconButton } from '@mui/material';
import { BookmarkBorder } from '@mui/icons-material';

const CalibForm: React.FC = () => {
    const [alwaysPositive, setAlwaysPositive] = useState<boolean>(false);
    const [functionType, setFunctionType] = useState<string>('y = Ax + B');
    const [coefficients, setCoefficients] = useState({
      A: 1,
      B: 1,
      C: 0,
      D: 0,
    });
    const [customFunction, setCustomFunction] = useState<string>('y = Ax + B + x^2 + sqrt(x-1)');
    const [inputSignalRange, setInputSignalRange] = useState<[number, number]>([4, 20]);
    const [outputFlowRange, setOutputFlowRange] = useState<[number, number]>([0, 100000]);
    const [pipeDiameter, setPipeDiameter] = useState<number>(4);
  
    const handleCoefficientChange = (key: string, value: number) => {
      setCoefficients((prev) => ({ ...prev, [key]: value }));
    };
  
    const renderInputWithIcon = (label: string, value: any, onChange: (val: any) => void) => (
      <Box display="flex" alignItems="center" mb={1}>
        <Typography style={{ minWidth: '200px', fontSize: '0.875rem' }}>{label}</Typography>
        <TextField
          type="text"
          size="small"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <IconButton size="small">
          <BookmarkBorder fontSize="small" />
        </IconButton>
      </Box>
    );
  
    return (
      <div className="p-3 bg-card rounded-lg shadow-md">
        <Typography variant="h5" className="mb-3">1. CO2</Typography>
        <Typography variant="h6" className="mb-2">Calibration</Typography>
        <Typography style={{ fontSize: '0.875rem' }}>Kích hoạt giá trị luôn dương</Typography>
        <div className="flex-1">
        <FormControlLabel
        label={<Typography style={{ fontSize: '0.875rem' }}>Kích hoạt giá trị luôn dương</Typography>}
        className="mb-3"
          control={
            <Checkbox
              checked={alwaysPositive}
              onChange={(e) => setAlwaysPositive(e.target.checked)}
              size="small"
            />
          }

        />
        </div>
  
        <Box display="flex" alignItems="center" mb={3}>
          <Typography style={{ minWidth: '200px', fontSize: '0.875rem' }}>Lựa chọn kiểu hàm</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={functionType}
              onChange={(e) => setFunctionType(e.target.value)}
            >
              <MenuItem value="y = Ax + B">y = Ax + B</MenuItem>
            </Select>
          </FormControl>
          <IconButton size="small">
            <BookmarkBorder fontSize="small" />
          </IconButton>
        </Box>
  
        {Object.entries(coefficients).map(([key, value]) => (
          renderInputWithIcon(`Chỉ số ${key}`, value, (val) => handleCoefficientChange(key, parseFloat(val)))
        ))}
  
        {renderInputWithIcon('Hàm số tự tạo', customFunction, setCustomFunction)}
  
        <Typography variant="subtitle1" className="mt-3 mb-2" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sử dụng TBF-100</Typography>
  
        <Box display="flex" gap={2} mb={3}>
          {renderInputWithIcon('Toàn giải của tín hiệu đầu vào', inputSignalRange[0], (val) => setInputSignalRange([parseFloat(val), inputSignalRange[1]]))}
          {renderInputWithIcon('', inputSignalRange[1], (val) => setInputSignalRange([inputSignalRange[0], parseFloat(val)]))}
        </Box>
  
        <Box display="flex" gap={2} mb={3}>
          {renderInputWithIcon('Toàn giải của lưu lượng đầu ra (m³/h)', outputFlowRange[0], (val) => setOutputFlowRange([parseFloat(val), outputFlowRange[1]]))}
          {renderInputWithIcon('', outputFlowRange[1], (val) => setOutputFlowRange([outputFlowRange[0], parseFloat(val)]))}
        </Box>
  
        {renderInputWithIcon('Đường kính ống (m)', pipeDiameter, setPipeDiameter)}
      </div>
    );
  };
  

export default CalibForm;